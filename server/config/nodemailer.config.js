require('dotenv').config();

module.exports.transporter = {
  service: 'gmail',
  auth: {
    user: process.env.serverEmail,
    pass: process.env.serverEmailPassword
  }
};

module.exports.mailOptions = (req, user, token) => {
  return {
    from: 'no-reply@yourwebapplication.com',
    to: user.email,
    subject: 'Account Verification Token',
    text: `Hello ${user.username},\n\n
          Please verify your account by clicking the following link:\n
          http:\/\/${process.env.domainUrl}\/verification\/${token.token}\n\n
          kind regards,\n
          Bitcoin bitacora team.`
    /*text: `Hello ${user.username},\n\n
          Please verify your account by clicking the following link:\n
          http:\/\/${req.headers.host}\/api\/verification\/${token.token}\n\n
          kind regards,\n
          Bitcoin bitacora team.`*/
  }
};
