const db = require("../database/dbConfig.js");

module.exports = {
	register,
	login
}

function register(user) {
	return db("users").insert(user);
}

function login(user) {
	return db("users").get(user);
}