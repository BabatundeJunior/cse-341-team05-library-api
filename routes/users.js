const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { validateUser, validateUserId } = require('../validators/userValidator');

// GET all users
router.get('/', userController.getAllUsers);

// GET user by ID
router.get('/:id', validateUserId, userController.getUserById);

// POST new user
router.post('/', validateUser, userController.createUser);

// PUT update user
router.put('/:id', [...validateUserId, ...validateUser], userController.updateUser);

// DELETE user
router.delete('/:id', validateUserId, userController.deleteUser);

module.exports = router;
