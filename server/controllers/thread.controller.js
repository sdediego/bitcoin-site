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

      const toSearch = [
        Reply.find({ thread: threadId }).populate('author', 'username'),
        Vote.find({ thread: threadId })
      ];

      Promise.all(toSearch)
        .then(values => {
          const replies = values[0];
          const votes = values[1].length;

          if (!replies) {
            res.status(200).json({
              msg: 'Unable to retrieve replies for this thread.',
              thread: thread,
              votes: votes
            });
            return;
          }

          if (!votes) {
            res.status(200).json({
              msg: 'Unable to retrieve votes for this thread.',
              thread: thread,
              replies: replies
            });
            return;
          }

          res.status(200).json({ thread, replies, votes });
          return;
        })
        .catch(error => {
          res.status(500).json({
            msg: 'Error while resolving promise.',
            error: error.message
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

  Category.findOne({ category: req.params.category })
    .then(category => {
      console.log('NEW THREAD', req.body.bitcoinPrice);
      const newThread = new Thread({
        author: req.user.id,
        category: category.id,
        title: req.body.title,
        content: req.body.content,
        bitcoinPrice: req.body.bitcoinPrice
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
          return;
        })
        .catch(error => {
          res.status(500).json({ msg: 'Unable to save new thread.' });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({
        msg: 'An error ocurred. Unable to find category.',
        newThread: null
      });
      return;
    });
};

module.exports.removeThread = (req, res, next) => {
  const threadId = req.params.id;

  Thread.findById(threadId)
    .populate('author')
    .exec((error, thread) => {
      if (error) {
        res.status(500).json({
          msg: 'Error fetching thread.',
          error: error
        });
        return;
      }

      if (!thread) {
        res.status(404).json({ msg: 'Thread not found.' });
        return;
      }

      if (thread.author.id !== req.user.id) {
        res.status(403).json({ msg: 'Unallowed to remove this thread.' });
        return;
      } else {

        const toRemove = [
          Thread.findByIdAndRemove(threadId),
          Reply.find({ thread: threadId }).remove(),
          Vote.find({ thread: threadId }).remove()
        ];

        Promise.all(toRemove)
          .then(result => {
            const thread = result[0];
            const replies = result[1];
            const votes = result[2];

            res.status(200).json({
              msg: 'Thread and reference docs successfully removed.',
              thread: thread,
              reply: replies,
              votes: votes
            });
            return;
          })
          .catch(error => {
            thread.remove()
              .then(thread => {
                res.status(206).json({
                  msg: 'Thread removed. Referenced docs remain intact.',
                });
                return;
              })
              .catch(error => {
                res.status(500).json({
                  msg: 'Error resolving promises simultaneously.',
                  error: error
                });
                return;
              });
          });
      }
    });
};
