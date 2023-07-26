const express = require('express');
const router = express.Router();
const GameControl = require('../controllers/cGame');
const auth = require('../middleware/auth');

router.get('/', auth, GameControl.getAllGame);
router.post('/', auth, GameControl.createGame);
router.put('/:id', auth, GameControl.modifyGame);
router.delete('/:id', auth, GameControl.deleteGame);

module.exports = router;