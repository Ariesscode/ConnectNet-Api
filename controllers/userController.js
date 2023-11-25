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
      // async getOneUser(req, res) {
      //   try {
      //     const user = await User.findOne({ _id: req.params.userId })  //parameter in route :userId
      //       .select('-__v')
      //       .populate('thoughts'); //do not include  "-"
            

      //     if (!user) {
      //       return res.status(404).json({ message: 'User not found' });
      //     }
    
      //     res.json(user);
      //   } catch (err) {
      //     res.status(500).json(err);
      //   }
      // },
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
        console.log('You are updating a user.');
        console.log(req.body);
      
        try {
          const updateData = { ...req.body };
      
          // Check if friends are provided in the request, and add them to the updateData
          if (req.body.friends) {
            updateData.$addToSet = { friends: { $each: req.body.friends } };
            delete updateData.friends; // Remove friends from the main updateData
          } 
                const user = await User.findOneAndUpdate(
                  { _id: req.params.userId },
                  { $set: req.body },
                  { runValidators: true, new: true }
                );
          
      
          if (!user) {
            return res.status(404).json({ message: 'User not found.' });
          }
      
          res.json(user);
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
      },
      
    };
    
