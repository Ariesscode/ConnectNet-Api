const { User, Thought } = require('../models');


module.exports = {
    async getAllUsers(req, res) {
        try {
          const users = await User.find();
          res.json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      async getOneUser(req, res) {
        try {
          const user = await User.findOne({ _id: req.params.userId })
          // .populate('thoughts');
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
     
      async createUser(req, res) {
        try {
          const user = await User.create(req.body);
          res.json(user);
        } catch (err) {
          res.status(500).json(err);
        }
      },
      // Delete a user and associated apps
      async deleteUserById(req, res) { 
        try {
          const user = await User.findOneAndDelete({ _id: req.params.userId }); //find a user and delete that userId
    
          if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
    
          await Thought.deleteMany({ _id: { $in: user.thoughts } });  //deletes thoughts from user model property thoughts
          res.json({ message: 'User and associated thoughts deleted!' })
        } catch (err) {
          res.status(500).json(err);
        }
      },
      
      async updateUser(req, res) {
        try {
          const allowedFields = ['username', 'email'];
          const updates = {};
      
          for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
              updates[field] = req.body[field];
            }
          }
      
          const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: updates },
            { runValidators: true, new: true }
          );
      
          if (!user) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.status(200).json({ user, message: 'User was updated!' });

        } catch (err) {
          if (err.name === 'ValidationError') {
            return res.status(422).json({ error: err.message });
          }
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

          const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $pull: { friends: friendId } },
            { new: true }
          );
      
          if (!updatedUser) {
            return res.status(404).json({ error: 'User or friend not found' });
          }
          if (!updatedUser.friends.includes(friendId)) {
            return res.status(404).json({ error: 'Friend not found in user\'s friend list' });
          }
      
          res.json({ message: 'Friend removed successfully', user: updatedUser });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Server error' });
        }
      },
 async createThought(req, res) {
  try {
    const { userId } = req.params;
    const { text, username } = req.body; //required

    // Create a new thought
    const newThought = await Thought.create({
      text, //required
      username, //required
    });

    // Add the new thought's ObjectId to the user's thoughts array
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $push: { thoughts: newThought._id } }, //add to thoughts array of id's user model ref thought model
      { new: true }
    );

    res.json({ newThought, updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
 }  
    };
    
