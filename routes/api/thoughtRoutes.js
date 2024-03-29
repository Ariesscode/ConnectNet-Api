const router = require('express').Router();


const {
    getThoughts,  //thought routes file
    getOneThought,
    removeThought,
    updateThought,
    createReaction,
    deleteReaction,
  } = require('../../controllers/thoughtController');
  //api/thoughts
router.route('/').get(getThoughts)//routes will use the name of crud function when called
  //api/thoughts/:thoughtId
router.route('/:thoughtId').get(getOneThought).delete(removeThought); //accepts thought id parameter in url
router.route('/:thoughtId/update').put(updateThought);
router.route('/:thoughtId/reactions')
  .post(createReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);




module.exports = router;
