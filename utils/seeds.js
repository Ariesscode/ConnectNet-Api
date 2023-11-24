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


  const userSeeds = [
    {
      username: 'Pokemon11',
      email: 'pokemon11@email.com',
      thoughts: [
        'Thought here.', 
      ],
      friends: [
        'chrisLui',
        'Hannah34',
      ],
    },
    {
      username: 'Hannah34',
      email: 'hannah34@email.com',
      thoughts: [
        'Another thought.', 
      ],
      friends: [
        'Pokemon11',
        'chrisLui',
      ],
    },
    {
      username: 'StanleyLewis',
      email: 'stanley73@email.com',
      thoughts: [
        'Thought here.', 
      ],
      friends: [
        'Jennifer1',
      ],
    },
    {
      username: 'chrisLui',
      email: 'chrisLui95@email.com',
      thoughts: [
        'Im thinking right now of a thought.', 
      ],
      friends: [
        'Pokemon11',
        'Hannah34',
        'Jennifer1',
      ],
    },
    {
      username: 'Jennifer1',
      email: 'jennifer1@email.com',
      thoughts: [
        'This is a thought.', // Reference the thought directly using the thought's username
      ],
      friends: [
        'StanleyLewis',
        'chrisLui',
      ],
    },
  ];
  
