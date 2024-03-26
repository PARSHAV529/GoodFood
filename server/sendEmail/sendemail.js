const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '1goodfood143@gmail.com',
      pass: 'vfoi rbqi ibcp wbnr'
    }
    
  });

  router.post('/send-email', (req, res) => {
    const { recipientEmail,text ,subject} = req.body
  
    let email = recipientEmail.userEmail;
    
  
  
    const mailOptions = {
      from: '1goodfood143@gmail.com',
      to: email,
      subject: subject,
      text: text
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
      } else {
        console.log('Email sent:', info.response);
        res.send('Email sent successfully');
      }
    });
  });

  module.exports = router;
