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

    const token = req.headers.authToken;

    if (token) {
        firebase.auth().verifyIdToken(token)
        .then(function(decodedToken){
            req.user = decodedToken.uid;
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
        res.redirect('/login');
    }

    }

}
