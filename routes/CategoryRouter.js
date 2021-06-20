const express = require('express');
const router = express.Router();
const CategoryController = require('../controllers/CategoryController');

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints to manage categories data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the category
 *           example: 1
 *         name:
 *           type: string
 *           description: Name of the category
 *           example: cats
 * */

// GET Categories
/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Returns a list of all the categories in the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    count:
 *                       type: integer
 *                       description: number of categories retrieved from DB
 *                    data:
 *                       type: array
 *                       items:
 *                        $ref: '#/components/schemas/Category'
 *
 */
router.get('/', CategoryController.getCategories);
// CREATE Category
/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Create a category
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: eturns the data of the category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */
router.post('/', CategoryController.createCategory);
// COUNT Categories
/**
 * @swagger
 * /categories/count:
 *   get:
 *     summary: Count categories
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Return the total amount of categories in the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    count:
 *                       type: integer
 *                       description: number of categories retrieved from DB
 *                       example: 5
 */
router.get('/count', CategoryController.countCategories);
// GET ONE Category
/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Returns one category matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                count:
 *                  type: integer
 *                  example: 1
 *                data:
 *                  $ref: '#/components/schemas/Category'
 */
router.get('/:id', CategoryController.getOneCategory);
// UPDATE Category
/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: Returns the updated data of the category
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Category'
 */
router.put('/:id', CategoryController.updateCategory);
// DELETE Category
/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     tags: [Categories]
 *     responses:
 *       201:
 *         description: Returns the data of the category deleted
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Category'
 */
router.delete('/:id', CategoryController.deleteCategory);

module.exports = router;
