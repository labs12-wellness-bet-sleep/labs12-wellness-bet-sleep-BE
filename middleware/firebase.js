const firebase = require("../firebase/firebaseConfig.js");

module.exports = {
    isAuthenticated
}

//source: https://www.caffeinecoding.com/leveraging-express-middleware-to-authorize-your-api/

//https://firebase.google.com/docs/auth/admin/verify-id-tokens
function isAuthenticated(req, res, next) {
    const authHeader = req.headers.authorization;
    // console.log("authheader", authHeader);

    if(!authHeader) {
        return res.status(403).json({
            status: 403,
            message: "FORBIDDEN"
        })
    } else {
        firebase.auth().verifyIdToken(authHeader)
        .then(function(decodedToken){
            // console.log("decodedToken",decodedToken);
            req.firebaseId = decodedToken.uid;
            // console.log(req.firebaseId)
            next();
        })
        .catch(function(error){
            console.log(error);
            return res.status(500).json({
                status: 500,
                message: "This token is incorrect"
            })
        })
    }

}

