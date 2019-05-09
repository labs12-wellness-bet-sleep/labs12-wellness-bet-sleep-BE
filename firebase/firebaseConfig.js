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

// const admin = require("firebase-admin");// setup firebase-admin:

// // remember to set GOOGLE_CLOUD_PROJECT in .env
// admin.initializeApp({
//     credential: admin.credential.cert({
//         projectId: 'wellness-bet-sleep',
//         clientEmail: 'firebase-adminsdk-cnsb3@birth-ride.iam.gserviceaccount.com',
//         privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDBjNWd7a56R295\nZvobebvJzKq88eI5foCIDLDeN8x5a3UtS9AfR8DkziThKhK3n3F6W3l1qoRRBgQD\nz4CWd9nuTzAKcuw23YD+W+h5xiHUxJpifjcyjpAPQvemQWEYjlmCC/5xZEtiXpgl\nZB9PCiHSDkKWnULIFe8jUmR+LaWLKDDl+A1QA1lurBKGV3C2HNMkNOCCcjPjkfoO\n51M7v/Hvl6sWbO8BuK5s9Nv40OncfizCnslj8DgDuj2USMR9nDhIInu6ouhvwyDl\nJmKdQOhBsUqi4GcruFfsr9KokVSvk7mh76oLVV8r6k+AJCgIXrYTYgaOsdStJnp5\n1YY3ewBtAgMBAAECggEAFO+X98JK+j0Z6MbjzO8JChYSbee4McHmQ1EkHJVqj8O4\n5BJsS8XmLpnB0X1MkwIzMyoL5FdygpUlAAiE/0GtmCKGrsqplHG3T0w/xFRTOoGd\ntYOzkstq98uloB04VICpW/DSMA/KO7TBvmGrJVCSQfd66nHOVHhS6r4x0pg7bObW\n3AF4zVEo5RQLAxcsGZTxx4Y7sWkBodMpW/rgV8tc5aCMd1FvXlZyF486j1Yv2Y3y\nrd4zMmRN8gUOXvOW12JUueiergIZunRBbXFGP1HXZ5dqPZm8D41Dm52GmqmDCwj2\nvs0W7auT3hx9Nv4Vf3r4QfTq5kC8XEY7oMp256xXXQKBgQDmW7ZNII4DE2POuWMn\nHzshLaZgEflEqJd3AT7R8gCHuL+bemqjDBYs40vEptuajrsDLjzoeYyNUFJp/PZ0\nieCy13RXbhCaGevYz5zj5L5VmKaP+kmE+Z8ovNsSQRnIXBOSDCTv+5mVOlk9TOSz\n1baxWmizVAmIPWoFuKNYQCMsrwKBgQDXGD0G5p8KFC3vi7qSucO1fDUwLLNTl6+u\nPRCtZKA5m4JKeiziaVhjWQF0G7oK89mdprIU5VoDPIYcUir+VtrBIAdtHWqzSQWL\nsn3qBmarBT47N71IfdBpjHRJqQGwM7i24x1AzhlomJv3GTx5mCasd377XJ27TQLF\nLQYiMEiDowKBgQCa7mgIK7MX4nyoVwuXDmxIfll+F9idEv78LTxBHBC7N8i3G3iJ\nPOHVQvJ8yvS8WO7yzrBscwPTL4iefGKOMwWLg1leTEqiOnjjk48jv388NrUf9Ohp\npTIkxhBZkKt0lGkdO0nElmXPdjT7A7J2OXDsi7ALnKPkm9mpC2vhORHvRQKBgFOR\nMTSbKTMLQAWPbf9PeP/rr+Z1l35ksnapdu9G5xE6n9Y7vXCBqTt/+xaXJyLWNrgP\naaTArsYPH7OlINsL95WM0hXMlgXt2t+5iz3/GqhbMyBiuYGOkAhR72Qm62b/0UYM\n2vKwoCKJGB9aiKpdOLlM++LAyu9YLjlZEsb5p1KtAoGBAJ4/pkhZJDhWw1xU8cBS\nOYrKVCumqXgYAB8Nsr2xYxGbIwrj5MN/5CEa6k9u1q6frpEcDLKHjHyDkBW16kr+\nxUzPRtdU3nMDOUtJNbyt5FO/2Fxq+XHF430H3h3hAb0ND7YbZGf1YpjjWkzLD8n3\nFfv5LtnuiEoHWmwbJKFdDqdI\n-----END PRIVATE KEY-----\n"
//     })
// });

module.exports = admin;

// fb.initializeApp();

var firebase = fb.initializeApp(firebaseConfig);

module.exports = firebase;

// module.exports = fb; 

