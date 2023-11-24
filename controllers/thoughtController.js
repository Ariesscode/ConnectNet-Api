const { User, Thought } = require('../models');



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
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);  //create a thought using request body and find the user with user id, update thoughts property with new created thought
      const user = await User.findOneAndUpdate(  
        { _id: req.body.userId }, //:userId
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought was creaated with unmatched user id.' });
      }

      res.status(201).json({ message: 'Thought created successfully!', thought });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async updateThought(req, res) {  //update thought by the id with request body 
    console.log('You are updating a thought.');
    console.log(req.body);

    try {
      const user = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughts: req.body } }, //set is used to update
        { runValidators: true, new: true }
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'Thought not found.' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async removeThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove(
        { _id: req.params.thoughtId },
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

 
async createReaction(req, res) {
  try {
    const newReaction = await Reaction.create(req.body.reaction);

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: { reactions: newReaction._id } },
      { new: true } // Return the updated thought
    );

    if (!updatedThought) {
      return res.status(404).json({ error: 'Thought cannot be found' });
    }

    res.status(201).json({ message: 'Reaction created and added to this thought id.', thought: updatedThought });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
},
async deleteReaction(req, res) {
  try {
    const deletedReaction = await Reaction.findByIdAndDelete(req.body.reactionId);

    if (!deletedReaction) {
      return res.status(404).json({ error: 'Reaction could not be found' });
    }

    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: newReaction._id } },
      { new: true } // Return the updated thought
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

   


