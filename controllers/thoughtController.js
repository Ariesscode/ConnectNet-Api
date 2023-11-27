const { User, Thought } = require('../models');
const Reaction = require('../models/reaction.js');



module.exports = {
  async getThoughts(req, res) { //find all thoughts
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getOneThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId }); //find thought by id parameter :thoughtId

      if (!thought) {
        return res.status(404).json({ message: 'No thought found.' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err)
    }
  },
  // create a new post
 
  async updateThought(req, res) {  //update thought by the id with request body 
    console.log('You are updating a thought.');
    console.log(req.body);

    try {
      const allowedFields = ['text'];
      const updates = {};
  
      for (const field of allowedFields) {
        if (req.body[field] !== undefined) {
          updates[field] = req.body[field];
        }
      }
      const user = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: updates }, //set is used to update
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought not found.' });
      }

      res.json({user, message: 'Thought updated!'});
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeThought(req, res) {
    try {
      
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });  //deletes the thought by thought id in url param

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json({thought, message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createReaction(req, res) {
    try {

      const updatedThought = await Thought.findOneAndUpdate(  //find thought id to push reaction to 
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } }, //push the json body request of new reaction and username 
        { runValidators: true, new: true } // Return the updated thought
      );
  
      if (!updatedThought) {
        return res.status(404).json({ error: 'Thought cannot be found' });
      }
  
      res.status(201).json({ message: 'Reaction created and added to this thought id.', thought: updatedThought }); //return message with json of added reaction
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error', details: error.message });
    }
  },
async deleteReaction(req, res) {
  try {

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId }, //find the thought id using the params in url
      { $pull: { reactions: { reactions: req.params._id } } }, //pull reaction id from reactions property array
      { runValidators: true, new: true }
      // Return the updated thought
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought cannot be found' });
    }

    res.status(200).json({ message: 'Reaction was deleted from this thought id.', thought: updatedThought });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }

}
};

   


