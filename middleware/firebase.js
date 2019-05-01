const firebase = require("../firebase/firebaseConfig.js");

module.exports = {
    isAuthenticated
}

// source: https://www.caffeinecoding.com/leveraging-express-middleware-to-authorize-your-api/

// https://firebase.google.com/docs/auth/admin/verify-id-tokens
function isAuthenticated(req, res) {
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(403).json({
            status: 403,
            message: "FORBIDDEN"
        })
    } else {

    const token = req.body.authToken;

    if (token) {
        firebase.auth().verifyIdToken(token)
        .then(function(decodedToken){
            req.body.token = decodedToken.uid;
            next();
        })
        .catch(function(error){
            return res.status(500).json({
                status: 500,
                message: "This token is incorrect"
            })
        })
    }
    else {
        res.status(401).json({

            errorMessage: "You don't have the proper credentials to log in or register."
      
        });
    }

    }

}

function restricted (req, res) {
    const token = req.body.authToken;

    if (token) {
        next();
    }
    else {
        return res.status(401).json({
            status: 401,
            message: "You are not authorized to view this page."
        })
    }
}
