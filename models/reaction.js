const mongoose = require('mongoose');

const { Schema, Types } = mongoose;

const reactionSchema = new Schema(
  {
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
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

reactionSchema.virtual('formatDate').get(function () {
    return this.createdAt.toLocaleString(); // readable date for users 
  });


  module.exports = reactionSchema;

