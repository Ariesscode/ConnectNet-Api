const router = require('express').Router();

const {
    getThoughts,  //thought routes file
    getOneThought,
    createThought,
    removeThought,
  } = require('../../controllers/thoughtController');
  //api/thoughts
  router.route('/').get(getThoughts).post(createThought);  //routes will use the name of crud function when called
  //api/thoughts/:thoughtId
  router.route('/:thoughtId').get(getOneThought).delete(removeThought); //accepts thought id parameter in url
  



module.exports = router;
