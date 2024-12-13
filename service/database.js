const { MongoClient, ObjectId } = require('mongodb');
const config = require('./dbConfig.json');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority&appName=Cluster0`;
//added some more parameters to MongoClient to fix error in development
const client = new MongoClient(url, {tls:true, serverSelectionTimeoutMS:3000, autoSelectFamily:false});
const db = client.db('dodue');
const dbUsers = db.collection('users');

// This will asynchronously test the connection and exit the process if it fails
(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database because ${ex.message}`);
  process.exit(1);
}).finally(() => {
  console.log("database tested");
});

function getUser(email) {
  if (!email) return;
  return dbUsers.findOne({ email: email }, {projection:{ email:1, password:1, loginToken:1 }});
}

function getUserByToken(token) {
  if (!token) return;
  return dbUsers.findOne({ loginToken: token }, {projection:{ email:1, password:1, loginToken:1 }});
}

async function getListByToken(token, listType) {
  if (!token) return;
  const response = await dbUsers.findOne({ loginToken: token }, {projection:{ [listType]:1 }});
  return response[listType];
}

function getListsByToken(token) {
  if (!token) return;
  return dbUsers.findOne({ loginToken: token }, {projection:{ undated:1, dated:1 }});
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    loginToken: uuid.v4(),
  };
  const { insertedId } = await dbUsers.insertOne(user);
  user._id = insertedId;
  return user;
}

async function updateList(token, listsToUpdateObj) {
  if (!token) return;
  return dbUsers.updateOne({ loginToken:token }, { $set: listsToUpdateObj}, { upsert:true });
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  getListByToken,
  updateList,
  getListsByToken,
};

// async function test() {
//   const token = "0786a0d3-dfa9-4e76-92cd-4e5e41a840e5";
//   const listType = "undated";
//   // const response = getListByToken("0786a0d3-dfa9-4e76-92cd-4e5e41a840e5","undated");
//   // response = dbUsers.updateOne({ loginToken:"0786a0d3-dfa9-4e76-92cd-4e5e41a840e5" }, { $set: {undated:[{"id":"1"}]}}, { upsert:true });
//   const response = await dbUsers.findOne({ loginToken: token }, {projection:{ [listType]:1 }});
//   const response2 = await getListByToken("0786a0d3-dfa9-4e76-92cd-4e5e41a840e5", "undated");
//   console.log(response[listType]);
//   console.log(response2);
// }
// test();