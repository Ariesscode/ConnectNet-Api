
const { Schema, Types, model } = require('mongoose');
const reactionSchema = require('./reaction.js');

const thoughtSchema = new Schema(

  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
    createdAt: {
      type: Date, //creates a current date 
      default: Date.now(),
    },
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function () { //counts the length of array (reactions)
  return this.reactions.length;
});

thoughtSchema.virtual('formatDate').get(function () {
    return this.createdAt.toLocaleString(); // readable date for users 
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought;

