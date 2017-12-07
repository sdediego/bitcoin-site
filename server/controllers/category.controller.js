const path = require('path');
const debug = require('debug')('server:'+ path.basename(__filename));
const Category = require('./../models/category.model');
const Thread = require('./../models/thread.model');

module.exports.list = (req, res, next) => {
  Category.find()
    .then(categories => {
      if (!categories) {
        res.status(404).json({ msg: 'No categories listed.' });
        return;
      }

      res.status(200).json(categories);
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to retrieve categories list.' });
      return;
    });
};

module.exports.category = (req, res, next) => {
  const category = req.params.category;

  Category.findOne({ category })
    .then(category => {
      Thread.find({ category: category.id })
        .populate('author', 'username')
        .populate('category', 'category')
        .exec()
        .then(threads => {
          if (threads.length === 0) {
            res.status(404).json({ msg: `No threads for category ${category.category}.` });
            return;
          }

          res.status(200).json(threads);
        })
        .catch(error => {
          res.status(500).json({ msg: 'Unable to retrieve category threads.' });
          return;
        });
    })
    .catch(error => {
      res.status(500).json({ msg: 'Unable to retrieve requested category.' });
      return;
    });
};
