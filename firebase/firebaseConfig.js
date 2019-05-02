var logger = require('morgan');
var fb = require('firebase-admin');

// see https://firebase.google.com/docs/web/setup#config-nodejs-app
var firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    databaseURL: process.env.databaseURL,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
}

// fb.initializeApp();

var firebase = fb.initializeApp(firebaseConfig);

module.exports = firebase;

// module.exports = fb; 