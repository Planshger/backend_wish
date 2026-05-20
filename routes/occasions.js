const router = require('express').Router();
const occasionController = require('../controllers/occasionController');

router.get('/', occasionController.getAll);

module.exports = router;