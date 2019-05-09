const joinLinkRouter = require("express").Router();
const sendgrid = require('@sendgrid/mail');
const db = require("../database/dbConfig.js");
const groupModel = require('../models/groups.js');

const sendgridKey = process.env.SENDGRID_API_KEY
sendgrid.setApiKey(sendgridKey)

// joinLinkRouter.get('/join', async (req, res) => {
//     try{
//         await sendgrid.send({
//             to: '',
//             from: 'wellnessbetsleep@gmail.com',
//             subject: 'Join Code',
//             text: 'Here is your join code to send to your friends',
//             html:`<a href='/dashboard/'>Link To Your Group</a>`
//         })   
//         res.status(200).json({ status: 'success' });
//       } catch (error) {
//           console.log(error)
//       }
// })


// module.exports = joinLinkRouter


joinLinkRouter.get("/", (req, res) => {
  
  const { recipient, sender, topic, text, link } = req.query;
  
  const group = groupModel.addGroup({userId: 499});
  console.log(group)

  // let clientUrl = `http://localhost:8080/api/groups/join/${text}/?groupId=`;

  // const msg = {
  //   to: recipient,
  //   from: sender,
  //   subject: topic,
  //   text: text,
  //   html: `<p>Your inviation link is: <a href='${clientUrl}'>${clientUrl}</a></p>`
  // };

  // sendgrid.send(msg).then((msg) => console.log(text));
});

module.exports = joinLinkRouter;