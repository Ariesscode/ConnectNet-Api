const connection = require('../config/connection');
const mongoose = require('mongoose');
const {Thought, User} = require('../models');
const seedThoughts = [
    {
        text: 'This is a thought.',
        username: 'Jennifer1',
        reactions: [
          {
            reactionBody: 'This is a reaction.',
            username: 'StanleyLewis'
          },
        ],
      },
      
    {
      text: 'Another thought.',
      username: 'Hannah345',
      reactions: []
    },
    {
        text: 'Thought here.',
        username: 'StanleyLewis',
        reactions: [
          {
            reactionBody: 'Reaction here.',
            username: 'Hannah345'
          },
        ],
      },
      {
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
        text: 'Thought here.',
        username: 'Pokemon11',
        reactions: [
          {
            reactionBody: 'Reaction here.',
            username: 'Hannah345'
          },
        ],
      },
  ];
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
        'Thought here.', 
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
        'Another thought.', 
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
        'Thought here.', 
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
        'Im thinking right now of a thought.', 
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
        'This is a thought.', 
      ],
      friends: [
        userId2,
        userId3,
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
  