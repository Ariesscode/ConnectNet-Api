const router = require('express').Router();

const {
    getThoughts,  //thought routes file
    getOneThought,
    createThought,
    removeThought,
    updateThought,
    addFriend,
    deleteFriend,
  } = require('../../controllers/thoughtController');
  //api/thoughts
  router.route('/').get(getThoughts).post(createThought);  //routes will use the name of crud function when called
  //api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getOneThought).delete(removeThought); //accepts thought id parameter in url
  
router.route('/:thoughtId/update').put(updateThought);

router.route('/api/users/:userId/friends/:friendId').update(addFriend)
router.route('/api/users/:userId/friends/:friendId').delete(deleteFriend)
module.exports = router;
