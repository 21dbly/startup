const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('database.js');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

const port = process.argv.length > 2 ? process.argv[2] : 4000;

// not sure why this is necessary
app.use(express.json());

// cookies are used to make sure user is logged in
// loginToken
app.use(cookieParser());

// serve up static pages
app.use(express.static('public'));

// not sure what this does
app.set('trust proxy', true);

// used for debugging
// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

const apiRouter = express.Router();
app.use('/api', apiRouter);

// create a new user
apiRouter.post('/auth/create', async (req, res) => {
  if (await DB.getUser(req.body.email)) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = await DB.createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.loginToken);

    res.send({ id: user._id });
  }
});

// login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = await DB.getUser(req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      setAuthCookie(res, user.loginToken);
      res.send({ loginToken: user.loginToken });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// logout a user
apiRouter.delete('/auth/logout', (_req, res) => { 
// why is async not used here?
  res.clearCookie('loginToken');
  res.status(204).end();
})

// secure routing to ensure user is logged in
const secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  const authToken = req.cookies['loginToken'];
  const user = await DB.getUserByToken(authToken);
  if (!authToken || !user) {
    res.status(401).send({ msg: 'Unauthorized' })
  } else {
    next();
  }
});

//get undated or dated list
// will change to use cookies instead of user in the url
// this might break with certain usernames
secureApiRouter.get('/list/:list_type(undated|dated)', async (req, res) => {
  const list = await DB.getListByToken(req.cookies['loginToken'], req.params.list_type) || [];
  res.send(list);
});

secureApiRouter.get('/task/:list_type(undated|dated)/:task_id', async (req, res) => {
  const list = await DB.getListByToken(req.cookies['loginToken'], req.params.list_type) || [];
  const task = list.find((t) => (t.id === req.params.task_id));
  if (!task) {
    res.status(404).send({msg: 'Task not found'});
    return;
  }
  res.send(task);
});

// adds a task to either undated or dated
secureApiRouter.post('/task', async (req, res) => {
  const lists = await DB.getListsByToken(req.cookies['loginToken'])
  const task = req.body.task;
  if (!task) {
    res.status(400).send({ msg: 'task not provided' });
    return;
  }
  if (!task.title) {
    res.status(400).send({ msg: 'task must have title' });
    return;
  }
  verify_lists(lists);
  const updatedListObj = add_to_correct_list(task, lists);
  await DB.updateList(req.cookies['loginToken'], updatedListObj);
  res.send(updatedListObj);
});

secureApiRouter.put('/task', async (req, res) => {
  const lists = await DB.getListsByToken(req.cookies['loginToken'])
  const task = req.body.task;
  const old_date = req.body.old_date;
  if (!task) {
    res.status(400).send({ msg: 'task not provided' });
    return;
  }
  if (!task.title) {
    res.status(400).send({ msg: 'task must have title' });
    return;
  }

  verify_lists(lists);
  const old_list_type = old_date ? "dated" : "undated";
  const old_list = lists[old_list_type];
  const old_index = old_list.findIndex((t) => (t.id === task.id));
  if (old_index < 0) {
    // the task that's being edited disappeared
    // I guess we just make a new task
    const updatedListObj = add_to_correct_list(task, lists);
    await DB.updateList(req.cookies['loginToken'], updatedListObj);
    res.send(updatedListObj);
    return;
  }
  if (old_date === task.date) {
    old_list[old_index] = task;
    const updatedOldListObj = {[old_list_type]: old_list};
    await DB.updateList(req.cookies['loginToken'], updatedOldListObj);
    res.send(updatedOldListObj);
    return;
  }
  old_list.splice(old_index, 1);
  const updatedOldListObj = {[old_list_type]: old_list};
  const updatedNewListObj = add_to_correct_list(task, lists);
  // updatedAllListsObj will have each list that needs to change
  // (both lists if the task moved from one list to the other)
  const updatedAllListsObj = {...updatedOldListObj, ...updatedNewListObj};
  await DB.updateList(req.cookies['loginToken'], updatedAllListsObj);
  res.send(updatedAllListsObj);
});

secureApiRouter.delete('/task/:list_type(undated|dated)/:task_id', async (req, res) => {
  const { list_type, task_id } = req.params;
  const list = await DB.getListByToken(req.cookies['loginToken'], list_type);
  if (!list) {
    res.status(404).send({ msg: 'list not found' });
    return;
  }
  const i = list.findIndex((t) => (t.id === task_id));
  list.splice(i, 1);
  await DB.updateList(req.cookies['loginToken'], {[list_type]:list});
  res.send(`task ${task_id} deleted`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// ---------- Helper Functions -------------

function verify_lists(lists_obj) {
  // verifies that undated and dated exist. Maybe there's a better way. Maybe I shouldn't even check
  if (!lists_obj.dated) lists_obj.dated = [];
  if (!lists_obj.undated) lists_obj.undated = [];
}

function add_to_correct_list(task, lists_obj) {
  if (task.date) {
    insert_in_order(lists_obj.dated, task);
    return { "dated": lists_obj.dated };
  } else {
    lists_obj.undated.push(task);
    return {"undated": lists_obj.undated};
  }
}

function insert_in_order(list, task) {
  let task_date_time = (task.date || "") + "-" + (task.time || "");
  for (let i in list) {
    let t = list[i];
    let t_date_time = (t.date || "") + "-" + (t.time || "");
    if (t_date_time > task_date_time) {
      list.splice(i, 0, task);
      return;
    }
  }
  list.push(task);
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
  res.cookie("loginToken", authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}