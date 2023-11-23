const router = require('express').Router();


const {
  getAllUsers, //user routes file for functions to use the names of the function for url path
  getOneUser,
  createUser,
} = require('../../controllers/userController'); //require the names in 

// /api/users
router.route('/').get(getAllUsers).post(createUser); 

// /api/users/:userId
router.route('/:userId').get(getOneUser);

module.exports = router;
