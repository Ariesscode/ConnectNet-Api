const { Schema, model } = require('mongoose'); //actiivity 28, 26

const { Schema, model } = require('mongoose'); //actiivity 28, 26


    const userSchema = new Schema({
      username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 50,
        trim: true,
        thoughts: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Thought',
            },
          ],
      },
      email: {
        type: String,
        unique: true,
        required: true,
        // add validation as needed
      },
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        virtuals: true,
      },
      id: false,
    },
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
  

  const User = model('user', userSchema);

module.exports = User;


