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
          const user = await User.findOne({ _id: req.params.userId })  //parameter in route :userId
            .select('-__v');
    
          if (!user) {
            return res.status(404).json({ message: 'User not found' });
          }
    
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
    };
    