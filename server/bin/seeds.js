require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const Category = require('./../models/category.model');
const Thread = require('./../models/thread.model');
const Reply = require('./../models/reply.model');

mongoose.connect(process.env.mongoDB, { useMongoClient: true });

/*const users = [
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
});*/

/*const categories = [
  {
    category: 'bitcoin'
  },
  {
    category: 'blockchain'
  },
  {
    category: 'economia'
  },
  {
    category: 'criptodivisas'
  }
];

Category.collection.drop();

Category.create(categories, (error, docs) => {
  if (error) {
    throw error;
  }
  docs.forEach(category => {
    console.log(category.category);
  });
  mongoose.connection.close();
});*/

const threads = [
  {
    author: '5a286fad8cb602300171fca6',
    category: '5a2885f4cbb1144991a38090',
    content: 'El precio del bitcoin alcanza maximos historicos...',
    title: 'Bitcoin skyrocketing'
  },
  {
    author: '5a286f9cf6cb8230b24ac989',
    category: '5a2885f4cbb1144991a38090',
    content: 'Una vez más salta a los titulares el elevado ascenso...',
    title: 'Mundo burbúja'
  },
  {
    author: '5a286fad8cb602300171fca6',
    category: '5a2885f4cbb1144991a38091',
    content: 'El nasdaq está en fase de prueba de su novedosa...',
    title: 'El nasdaq se suma a blockchain'
  },
  {
    author: '5a286fad8cb602300171fca6',
    category: '5a2885f4cbb1144991a38092',
    content: 'El bitcoin esta aqui para quedarse. Dentro de unos años...',
    title: 'El impacto del bitcoin en el día a día'
  },
  {
    author: '5a286fad8cb602300171fca6',
    category: '5a2885f4cbb1144991a38093',
    content: 'Para comprender el auge del gran número de distintas...',
    title: '¿Quién es quién?'
  }
];

Thread.collection.drop();

Thread.create(threads, (error, docs) => {
  if (error) {
    throw error;
  }
  docs.forEach(thread => {
    console.log(thread._id);
  });
  mongoose.connection.close();
});
