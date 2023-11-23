const router = require('express').Router();

const {
    getThoughts,  //thought routes file
    getOneThought,
    createThought,
    removeThought,
    updateThought,
  } = require('../../controllers/thoughtController');
  //api/thoughts
  router.route('/').get(getThoughts).post(createThought);  //routes will use the name of crud function when called
  //api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getOneThought).delete(removeThought); //accepts thought id parameter in url
  
router.route('/:thoughtId/update').post(updateThought);


module.exports = router;
