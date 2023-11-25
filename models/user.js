const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
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
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
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
  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

userSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});




  const User = model('user', userSchema); //use in template or use properties from User model use "use"

module.exports = User;



