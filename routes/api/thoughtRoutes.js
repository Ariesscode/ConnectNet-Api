const router = require('express').Router();

const {
    getThoughts,  //thought routes file
    getOneThought,
    createThought,
  } = require('../../controllers/thoughtController');
  
  router.route('/').get(getThoughts).post(createThought);  //routes will use the name of crud function when called
  
  router.route('/:thoughtId').get(getOneThought); //accepts thought id parameter in url
  



module.exports = router;
