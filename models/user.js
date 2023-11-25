const mongoose = require('mongoose');
const { Schema, Types, model } = require('mongoose'); //actiivity 28, 26



    const userSchema = new Schema({
      username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        trim: true,
      },
      email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator: function (value) {
              // Mongoose basic email validation
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`,
          },
        // validation 
      },
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
  },
    {
      toJSON: {
        virtuals: true,
      },
      id: true,
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

  // userSchema.virtual('thoughtCount').get(function () {
  //   return this.thoughts.length;
  // });


  const User = model('user', userSchema); //use in template or use properties from User model use "use"

module.exports = User;



