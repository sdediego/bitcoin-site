const Vote = require('./../models/vote.model');

module.exports.vote = (req, res, next) => {
  const newVote = new Vote({
    user: req.user.id,
    thread: req.params.threadId
  });

  newVote.save()
    .then(() => {
      res.status(200).json({ msg: 'Vote successfully added.' });
      return;
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to save new vote.' });
      return;
    });
};
