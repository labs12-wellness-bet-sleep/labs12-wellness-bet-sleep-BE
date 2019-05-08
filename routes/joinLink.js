const joinLinkRouter = require("express").Router();
const sendgrid = require('@sendgrid/mail')

const sendgridKey = process.env.SENDGRID_API_KEY
sendgrid.setApiKey(sendgridKey)

joinLinkRouter.get('/join', async (req, res) => {
    try{
        await sendgrid.send({
            to: '',
            from: 'wellnessbetsleep@gmail.com',
            subject: 'Join Code',
            text: 'Here is your join code to send to your friends',
            html:`<a href='/dashboard/'>Link To Your Group</a>`
        })   
        res.status(200).json({ status: 'success' });
      } catch (error) {
          console.log(error)
      }
})


module.exports = joinLinkRouter