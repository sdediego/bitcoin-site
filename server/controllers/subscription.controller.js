const nodemailer = require('nodemailer');
const nodemailerConfig = require('./../config/nodemailer.config');


module.exports.send = (req, res, next) => {
  console.log('DENTRO DE SEND', req.body.email);
  const email = req.body.email;
  const transporter = nodemailer.createTransport(nodemailerConfig.transporter);
  const mailOptions = nodemailerConfig.subscribeOptions(email);

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json({
        msg: 'Error sending verification email.',
        error: error
      });
      return;
    }

    res.status(200).json({
      msg: `Subscription email sent correctly to ${email}.`
    });
    return;
  });
};
