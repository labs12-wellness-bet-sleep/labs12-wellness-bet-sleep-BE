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
    "profilePhoto",
    "email",
    "role",
    "fullName"
  );
}

function findById(id) {
  return db("users")
    .where({ id })
    .select(
      "id",
      "password",
      "profilePhoto",
      "email",
      "role",
      "fullName"
    )
    .first();
}

function updateUser(id, changes) {
  return db("users")
      .where({ id })
      .update(changes, '*');
}
