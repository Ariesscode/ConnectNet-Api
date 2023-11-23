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
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { thought: { thoughtId: req.params.thoughtId } } },
        { runValidators: true, new: true }
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

  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;


    const user = await User.findById(userId); //validation
    const friend = await User.findById(friendId); //validation
    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }
    // Check if the friendId is already in the user's friends list
    if (user.friends.includes(friendId)) {
      return res.status(400).json({ error: 'Friend already in the list' });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { friends: friendId } },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'Friend added successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
},
 async deleteFriend(req, res) {
  try {
    const { userId, friendId } = req.params;
    const user = await User.findById(userId); //validation
    const friend = await User.findById(friendId); //validation
    if (!user || !friend) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    const updatedUser = await User.findOneAndRemove(
      { _id: userId, friends: friendId },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: 'User or friend not found' });
    }

    res.json({ message: 'Friend removed successfully', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
}


};

   


