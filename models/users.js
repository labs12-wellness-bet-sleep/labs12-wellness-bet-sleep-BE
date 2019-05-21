const db = require("../database/dbConfig.js");

module.exports = {
  register,
  login,
  find,
  findById,
  updateUser
};

async function register(user) {
  const [id] = await db("users")
    .insert(user)
    .returning("id");

  return findById(id);
}

function login(email) {
  return db("users").where({email: email}).first();
}

function find() {
  return db("users").select(
    "id",
    "password",
    "firebase_id",
    "profilePhoto",
    "email",
    "role",
    "fullName"
  );
}

function findById(firebase_id) {
  return db("users")
    .where({ 'firebase_id': firebase_id })
    // .select(
    //   "id",
    //   "password",
    //   "profilePhoto",
    //   "firebase_id",
    //   "email",
    //   "role",
    //   "fullName",
    //   "SleepData"
    // )
    .first();
}

function updateUser(id, changes) {
  return db("users")
      .where({firebase_id: id })
      .update(changes, '*');
}
