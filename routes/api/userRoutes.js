const router = require('express').Router();


const {
  getAllUsers, //user routes file for functions to use the names of the function for url path
  getOneUser,
  createUser,
  deleteUserById,
  updateUser
  
} = require('../../controllers/userController'); //require the names in 

// /api/users
router.route('/').get(getAllUsers).post(createUser);  //get all users and create a user

// /api/users/:userId
router.route('/:userId').get(getOneUser).delete(deleteUserById); //get and delete user 
router.route('/:userId/update/').post(updateUser);   //update a user
module.exports = router;
