const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};

app.use(express.static('public'));

// app.set('trust proxy', true);

app.use(express.json());

// app.use((req, res, next) => {
//   console.log(req.url);
//   next();
// });

let apiRouter = express.Router();
app.use('/api', apiRouter);

// create a new user
apiRouter.post('/auth/create', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    res.status(409).send({ msg: 'Existing user' });
  } else {
    const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
    users[user.email] = user;

    res.send({ token: user.token });
  }
});

// login an existing user
apiRouter.post('/auth/login', async (req, res) => {
  const user = users[req.body.email];
  if (user) {
    if (req.body.password === user.password) {
      user.token = uuid.v4();
      res.send({ token: user.token });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

// logout a user
apiRouter.delete('/auth/logout', (req, res) => { // why is async not used here?
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
})

//get undated or dated list
// will change to use cookies instead of user in the url
// this might break with certain usernames
apiRouter.get('/list/:user/:list_type(undated|dated)', (req, res) => {
  const user_obj = users[req.params.user]
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  // console.log(req.params.list_type)
  const list = user_obj.lists?.[req.params.list_type] || [];
  res.send(list);
});

apiRouter.get('/task/:user/:list_type(undated|dated)/:task_id', (req, res) => {
  const user_obj = users[req.params.user]
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  // console.log(req.params.list_type)
  const list = user_obj.lists?.[req.params.list_type] || [];
  const task = list.find((t) => (t.id === req.params.task_id));
  if (!task) {
    res.status(404).send({msg: 'Task not found'});
    return;
  }
  res.send(task);
});

// adds a task to either undated or dated
apiRouter.post('/task/:user', (req, res) => {
  const user = req.params.user;
  const user_obj = users[user]
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  
  const task = req.body.task;
  if (!task) {
    res.status(400).send({ msg: 'task not provided' });
    return;
  }

  verify_lists(user_obj);
  res.send(add_to_correct_list(task, user_obj));
});

apiRouter.put('/task/:user', (req, res) => {
  const user = req.params.user;
  const user_obj = users[user];
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  const task = req.body.task;
  const old_date = req.body.old_date;
  if (!task) {
    res.status(400).send({ msg: 'task not provided' });
    return;
  }

  verify_lists(user_obj);
  const old_list = user_obj.lists[(old_date ? "dated" : "undated")];
  const old_index = old_list.findIndex((t) => (t.id === task.id));
  if (old_index < 0) {
      // the task that's being edited disappeared
      // I guess we just make a new task
    res.send(add_to_correct_list(task, user_obj));
    return;
  }
  if (old_date === task.date) {
    old_list[old_index] = task;
    res.send(old_list);
    return;
  }
  old_list.splice(old_index, 1);
  res.send(add_to_correct_list(task, user_obj));
});

apiRouter.delete('/task/:user/:list_type(undated|dated)/:task_id', (req, res) => {
  const { user, list_type, task_id } = req.params;
  const user_obj = users[user];
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  const list = user_obj.lists[list_type];
  if (!list) {
    res.status(404).send({ msg: 'list not found' });
    return;
  }
  const i = list.findIndex((t) => (t.id === task_id));
  user_obj[list_type] = list.splice(i, 1);
  res.send(`task ${task_id} deleted`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// ---------- Helper Functions -------------

function verify_lists(user_obj) {
  // verifies that undated and dated exist. Maybe there's a better way. Maybe I shouldn't even check
  if (!user_obj.lists) user_obj.lists = {undated:[], dated:[]};
  if (!user_obj.lists.dated) user_obj.lists.dated = [];
  if (!user_obj.lists.undated) user_obj.lists.undated = [];
}

function add_to_correct_list(task, user_obj) {
  if (task.date) {
    insert_in_order(user_obj.lists.dated, task);
    return user_obj.lists.dated;
  } else {
    user_obj.lists.undated.push(task);
    return user_obj.lists.undated;
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