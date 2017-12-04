require('dotenv').config();
const path = require('path');
const debug = require('debug')('server:'+ path.basename(__filename));
const dbUrl = process.env.mongoDB;

module.exports = (mongoose) => {
  mongoose.connect(dbUrl, { useMongoClient: true });
  mongoose.Promise = Promise;
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    debug(`Connected to the ${dbUrl} database`);
  });
};
