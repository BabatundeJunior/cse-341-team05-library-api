const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userValidator');
const verifyToken = require('../middleware/verifyToken');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST new user
router.post('/',verifyToken, validateUser, userController.createUser);

// PUT update user
router.put('/:id',verifyToken, [...validateUserId, ...validateUser], userController.updateUser);

// DELETE user
router.delete('/:id',verifyToken, validateUserId, userController.deleteUser);

module.exports = router;
