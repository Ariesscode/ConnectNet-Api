const connection = require('../config/connection');
const mongoose = require('mongoose');
const { Thought, User } = require('../models');


const userId0 = new mongoose.Types.ObjectId();
const userId1 = new mongoose.Types.ObjectId();
const userId2 = new mongoose.Types.ObjectId();
const userId3 = new mongoose.Types.ObjectId();
const userId4 = new mongoose.Types.ObjectId();

const userSeeds = [
  {
    _id: userId0,
    username: 'Pokemon11',
    email: 'pokemon11@email.com',
    thoughts: [
      new mongoose.Types.ObjectId(),
    ],
    friends: [
      userId3,
      userId1,
    ],
  },
  {
    _id: userId1,
    username: 'Hannah34',
    email: 'hannah34@email.com',
    thoughts: [
      new mongoose.Types.ObjectId(),
    ],
    friends: [
      userId0,
      userId3,
    ],
  },
  {
    _id: userId2,
    username: 'StanleyLewis',
    email: 'stanley73@email.com',
    thoughts: [
      new mongoose.Types.ObjectId(),
    ],
    friends: [
      userId4,
    ],
  },
  {
    _id: userId3,
    username: 'chrisLui',
    email: 'chrisLui95@email.com',
    thoughts: [
      new mongoose.Types.ObjectId(),
    ],
    friends: [
      userId0,
      userId1,
      userId4,
    ],
  },
  {
    _id: userId4,
    username: 'Jennifer1',
    email: 'jennifer1@email.com',
    thoughts: [
      new mongoose.Types.ObjectId(),
    ],
    friends: [
      userId2,
      userId3,
    ],
  },
];


const seedThoughts = [
  {
    _id: userSeeds[4].thoughts[0],
    text: 'Benefits of using API/s are staying updated, social media integregation, weather services, email integration and much more.',
    username: 'Jennifer1',
    reactions: [
      {
        reactionBody: 'This is a reaction.',
        username: 'StanleyLewis'
      },
    ],
  },

  {
    _id: userSeeds[1].thoughts[0],
    text: 'API is one to help programs and users be able to interact and exchange data.',
    username: 'Hannah345',
    reactions: []
  },
  {
    _id: userSeeds[2].thoughts[0],
    text: 'Input do work output.',
    username: 'StanleyLewis',
    reactions: [
      {
        reactionBody: 'Reaction here.',
        username: 'Hannah345'
      },
    ],
  },
  {
    _id: userSeeds[3].thoughts[0],
    text: 'Im thinking right now of a thought.',
    username: 'chrisLui',
    reactions: [
      {
        reactionBody: 'This is a reaction, cool!.',
        username: 'Pokemon11'
      },
    ],
  },
  {
    _id: userSeeds[0].thoughts[0],
    text: 'This is a good way to save developers expense and time using API/s.',
    username: 'Pokemon11',
    reactions: [
      {
        reactionBody: 'Reaction here.',
        username: 'Hannah345'
      },
    ],
  },
];





connection.once('open', async () => {
  console.log('Connected');

  try {
    // Check and drop 'users' collection
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.db.dropCollection('users');
      console.log('Dropped collection: users');
    }


    // Check and drop 'thoughts' collection
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
      await connection.db.dropCollection('thoughts');
      console.log('Dropped collection: thoughts');
    }
    const insertedUsers = await User.insertMany(userSeeds);
    console.log(`${insertedUsers.length} users inserted successfully`);
    const insertedThoughts = await Thought.insertMany(seedThoughts);
    console.log(`${insertedThoughts.length} thoughts inserted successfully`);

    console.log('Database seeded!');
    console.info('Seeding complete! 🌱');
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
});
