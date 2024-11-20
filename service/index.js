const express = require('express');
const uuid = require('uuid');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 4000;

let users = {};

app.use(express.static('public'));

// app.set('trust proxy', true);

app.use(express.json());

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
apiRouter.delete('/auth/logout', (req, res) => { // why is await not used here?
  const user = Object.values(users).find((u) => u.token === req.body.token);
  if (user) {
    delete user.token;
  }
  res.status(204).end();
})

//get undated or dated list
// will change to use cookies instead of user in the url
// this might break with certain usernames
apiRouter.get('/:user/:list_type(undated|dated)', (req, res) => {
  const user_obj = users[req.params.user]
  if (!user_obj) {
    res.status(404).send({ msg: 'User not found' });
    return;
  }
  // console.log(req.params.list_type)
  const list = user_obj.lists?.[req.params.list_type] || [];
  res.send(list);
});

// adds a task to either undated or dated
apiRouter.post('/:user/task', (req, res) => {
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

  // the part that actually adds to the correct list
  if (task.date) {
    // verifies that undated and dated exist. Maybe there's a better way
    if (!user_obj.lists) user_obj.lists = {undated:[], dated:[]};
    if (!user_obj.lists.dated) user_obj.lists.dated = [];

    insert_in_order(user_obj.lists.dated, task);
    res.send(user_obj.lists.dated)

  } else {
    if (!user_obj.lists) user_obj.lists = {undated:[], dated:[]};
    if (!user_obj.lists.undated) user_obj.lists.undated = [];

    user_obj.lists.undated.push(task);
    res.send(user_obj.lists.undated)
  }
});


// app.get('*', (_req, res) => {
//   res.send({ msg: 'Startup service' });
// });

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


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