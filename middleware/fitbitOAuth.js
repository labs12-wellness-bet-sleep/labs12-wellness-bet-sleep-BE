const fitBitOAuthRouter = require("express").Router();

// Declare the redirect route
// source: https://www.sohamkamani.com/blog/javascript/2018-06-24-oauth-with-node-js/
fitBitOAuthRouter.get('/oauth/redirect', (req, res) => {
    // The req.query object has the query params that
    // were sent to this route. We want the `code` param
    axios({
      // make a POST request
      method: 'post',
      // to FitBit API
      url: `https://www.fitbit.com/oauth2/authorize?response_type=token&client_id=22DHYR&redirect_uri=https%3A%2F%2Fsleep-bet.herokuapp.com%2F&scope=sleep&expires_in=604800`,
      // Set the content type header, so that we get the response in JSOn
      headers: {
           accept: 'application/json'
      }
    }).then((response) => {
      // Once we get the response, extract the access token from
      // the response body
      const accessToken = response.data.access_token;
      const user_id = response.data.user_id;
      // redirect the user to the welcome page, along with the access token
      res.redirect(`/groupDashboard?access_token=${accessToken}`);
      res.status(200).json({user_id: user_id});


    })
  })

  export default fitBitOAuthRouter;