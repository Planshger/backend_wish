const router = require('express').Router();
const wishController = require('../controllers/wishController');
const authMiddleware = require('../middlewares/authMiddleware');

router.use(authMiddleware);

router.get('/', wishController.getAll);
router.get('/:id', wishController.getById);
router.post('/', wishController.create);
router.put('/:id', wishController.update);
router.delete('/:id', wishController.delete);

module.exports = router;