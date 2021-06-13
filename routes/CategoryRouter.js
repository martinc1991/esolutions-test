const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

// GET Categories
router.get('/', CategoryController.getCategories);
// CREATE Category
router.post('/', CategoryController.createCategory);
// COUNT Categories
router.get('/count', CategoryController.countCategories);
// GET ONE Category
router.get('/:id', CategoryController.getOneCategory);
// UPDATE Category
router.put('/:id', CategoryController.updateCategory);
// DELETE Category
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
