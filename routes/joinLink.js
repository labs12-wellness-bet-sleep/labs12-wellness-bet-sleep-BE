const joinLinkRouter = require("express").Router();
const sendgrid = require('@sendgrid/mail');

const uuidv4 = require("uuid/v4");

const sendgridKey = process.env.SENDGRID_API_KEY
sendgrid.setApiKey(sendgridKey)

joinLinkRouter.get('/join', async (req, res) => {
  const joinCode = uuidv4();
    try{
      // console.log(joinCode);
        await sendgrid.send({
            to: 'mssemmi8@gmail.com',
            from: 'wellnessbetsleep@gmail.com',
            subject: 'Join Code',
            text: joinCode,
            // html:`<a href='/dashboard/'>Link To Your Group</a>`
        })   
        res.status(200).json({ status: 'success' });
      } catch (error) {
          console.log(error)
      }
})


// module.exports = joinLinkRouter


// joinLinkRouter.get("/", (req, res) => {
//   const { recipient, sender, topic, text, link } = req.query;
//   let clientUrl = `http://localhost:8080/api/groups/join/${text}`;


//   const msg = {
//     to: recipient,
//     from: sender,
//     subject: topic,
//     text: text,
//     html: `<p>Your inviation link is: <a href='${clientUrl}'>${clientUrl}</a></p>`
//   };

//   sendgrid.send(msg).then((msg) => console.log(text));
//   //  sendgrid.send(msg)
// });

module.exports = joinLinkRouter;
