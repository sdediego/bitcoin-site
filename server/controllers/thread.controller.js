const Category = require('./../models/category.model');
const Thread = require('./../models/thread.model');
const Reply = require('./../models/reply.model');
const Vote = require('./../models/vote.model');

module.exports.thread = (req, res, next) => {
  const threadId = req.params.id;

  Thread.findById(threadId)
    .populate('author')
    .populate('category')
    .exec()
    .then(thread => {
      if (!thread) {
        res.status(404).json({ msg: 'Thread not found.' });
        return;
      }

      Reply.find({ thread: threadId })
        .populate('author')
        .exec()
        .then(replies => {
          //if (replies.length === 0) {
          //  res.status(200).json({ thread });
          //}

          res.status(200).json({ thread, replies });
        })
        .catch(error => {
          res.status(500).json({
            msg: 'Unable to retrieve thread replies.',
            thread: thread
          });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to retrieve requested thread.' });
      return;
    });
};
