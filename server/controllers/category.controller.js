const Category = require('./../models/category.model');

module.exports.category = (req, res, next) => {
  Category.find({})
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
