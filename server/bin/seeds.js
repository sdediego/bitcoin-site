require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');

mongoose.connect(process.env.mongoDB, { useMongoClient: true });

const users = [
  {
    username: 'sdediego',
    email: JSON.parse(process.env.emailSeeds)[0],
    password: bcrypt.hashSync("1234", bcrypt.genSaltSync(10)),
    name: 'Sergio de Diego'
  }
];

User.collection.drop();

User.create(users, (error, docs) => {
  if (error) {
    throw error;
  }
  docs.forEach(user => {
    console.log(user.username);
  });
  mongoose.connection.close();
});
