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

module.exports.newThread = (req, res, next) => {
  const newThread = new Thread({
    author: req.user.id,
    category: req.query.category,
    title: req.body.title,
    content: req.body.content
  });

  newThread.save()
    .then(() => {
      if (newThread.errors) {
        res.status(400).json(newThread);
        return;
      }
      res.status(200).json({
        msg: 'New thread successfully saved',
        newThread: newThread
      });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to save new thread.' });
      return;
    });
};

module.exports.newReply = (req, res, next) => {

};
