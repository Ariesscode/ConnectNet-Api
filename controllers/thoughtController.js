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

      res.json('Successful thought created! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};



