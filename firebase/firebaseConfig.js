var logger = require('morgan');
var fb = require('firebase-admin');

// see https://firebase.google.com/docs/web/setup#config-nodejs-app
var firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
}

var serviceAccount = require("");

var firebase = fb.initializeApp(firebaseConfig)

module.exports = firebase