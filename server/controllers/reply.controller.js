const Thread = require('./../models/thread.model');
const Reply = require('./../models/reply.model');

module.exports.reply = (req, res, next) => {
  const newReply = new Reply({
    author: req.user.id,
    thread: req.params.threadId,
    content: req.body.content
  });

  newReply.save()
    .then(() => {
      res.status(200).json({
        msg: 'New reply successfully saved',
        newThread: newReply
      });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to save new reply.' });
      return;
    });
};

module.exports.removeReply = (req, res, next) => {

};
