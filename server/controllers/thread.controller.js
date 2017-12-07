const Category = require('./../models/category.model');
const Thread = require('./../models/thread.model');
const Reply = require('./../models/reply.model');
const Vote = require('./../models/vote.model');

module.exports.thread = (req, res, next) => {
  const threadId = req.params.id;

  Thread.findById(threadId)
    .populate('author', 'username')
    .populate('category', 'category')
    .exec()
    .then(thread => {
      if (!thread) {
        res.status(404).json({ msg: 'Thread not found.' });
        return;
      }

      Reply.find({ thread: threadId })
        .populate('author', 'username')
        .exec()
        .then(replies => {
          if (!replies) {
            res.status(200).json({
              msg: 'Unable to retrieve replies for this thread.',
              thread: thread
            });
          }

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

module.exports.reply = (req, res, next) => {
  const newReply = new Reply({
    author: req.user.id,
    thread: req.params.id,
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

module.exports.vote = (req, res, next) => {
  const newVote = new Vote({
    user: req.user.id,
    thread: req.params.id
  });

  newVote.save()
    .then(() => {
      res.status(200).json({ msg: 'Vote successfully added.' });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to save new vote.' });
      return;
    });
};
