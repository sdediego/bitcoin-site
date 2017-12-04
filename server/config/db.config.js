const dbURI = process.env.mongoDB;

module.exports = (mongoose) => {
  mongoose.connect(dbURI, { useMongoClient: true });
  mongoose.Promise = Promise;
  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    debug(`Connected to the ${dbURI} database`);
  });
};
