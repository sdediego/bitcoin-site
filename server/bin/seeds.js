require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./../models/user.model');
const Category = require('./../models/category.model');
const Thread = require('./../models/thread.model');
const Reply = require('./../models/reply.model');

mongoose.connect("mongodb://ironhacker:abecedario1234@ds135946.mlab.com:35946/bitcointrix", { useMongoClient: true });

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

const categories = [
  {
    category: 'bitcoin',
    phrase: 'Un nuevo sistema financiero'
  },
  {
    category: 'blockchain',
    phrase: 'La tecnología más disruptiva del momento'
  },
  {
    category: 'economía',
    phrase: 'El impacto de Bitcoin en el mundo'
  },
  {
    category: 'criptodivisas',
    phrase: 'El mundo de las altcoins'
  }
];

Category.create(categories, (error, docs) => {
  if (error) {
    throw error;
  }
  docs.forEach(category => {
    console.log(category.category);
  });
  mongoose.connection.close();
});

/*const threads = [
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
    title: 'Mundo burbuja'
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
});*/

/*const replies = [
  {
    author: '5a286f9cf6cb8230b24ac989',
    thread: '5a292e23b61e892cc3ee668f',
    content: 'Genial articulo. En mi opinion...'
  },
  {
    author: '5a286f9cf6cb8230b24ac989',
    thread: '5a292e23b61e892cc3ee6693',
    content: 'Lo cierto es que con tanto cambio cuesta estar al día.'
  },
  {
    author: '5a286f9cf6cb8230b24ac989',
    thread: '5a292e23b61e892cc3ee6690',
    content: 'El proceso de monetización al que esta sujeto bitcoin explica...'
  },
  {
    author: '5a286fad8cb602300171fca6',
    thread: '5a292e23b61e892cc3ee6690',
    content: 'La volatilidad del bitcoin se ha ido reduciendo a medida que...'
  },
  {
    author: '5a286fad8cb602300171fca6',
    thread: '5a292e23b61e892cc3ee6693',
    content: 'En un mercado libre abierto a la competencia cualquiera puede...'
  }
];

Reply.collection.drop();

Reply.create(replies, (error, docs) => {
  if (error) {
    throw error;
  }
  docs.forEach(replies => {
    console.log(replies._id);
  });
  mongoose.connection.close();
});*/
