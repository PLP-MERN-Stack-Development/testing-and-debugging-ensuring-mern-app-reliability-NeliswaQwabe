const express = require('express');
const router = express.Router();
const bugController = require('../controllers/bug.controller');

// GET all bugs and POST a new bug
router.route('/')
    .get(bugController.getBugs)
    .post(bugController.createBug);

// GET single bug, PUT (update) bug, DELETE bug by ID
router.route('/:id')
    // .get(bugController.getBugById) // Optional: For single view
    .put(bugController.updateBug)
    .delete(bugController.deleteBug);

module.exports = router;