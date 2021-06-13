const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');

/**
 * @swagger
 * tags:
 *   name: Videos
 *   description: Endpoints to manage videos data
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Video:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - sources
 *         - thumb
 *       properties:
 *         id:
 *           type: integer
 *           description: ID of the video
 *           example: 1
 *         title:
 *           type: string
 *           description: Title of the video
 *           example: Swagger Documentation
 *         description:
 *           type: string
 *           description: Description of the video
 *           example: This video is about Swagger Documentation
 *         source_1:
 *           type: string
 *           description: URL 1 source for the video resource
 *           example: URL
 *         source_2:
 *           type: string
 *           description: URL 2 source for the video resource
 *           example: URL 2
 *         thumb:
 *           type: string
 *           description: URL source for the video thumbnail
 *           example: URL
 *         createdAt:
 *           type: string
 *           description: The date the video was uploaded
 *           example: "2021-06-13T13:02:32.635Z"
 *         updatedAt:
 *           type: string
 *           description: The last date the video was modified
 *           example: "2021-06-13T13:02:32.635Z"
 *         Categories:
 *           type: array
 *           items:
 *              $ref: '#/components/schemas/Category'
 *
 *
 * */

// GET Videos
/**
 * @swagger
 * /videos:
 *   get:
 *     summary: Get all videos
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: Returns a list of all the videos in the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    count:
 *                       type: integer
 *                       description: number of videos retrieved from DB
 *                    data:
 *                       type: array
 *                       items:
 *                        $ref: '#/components/schemas/Video'
 *
 */
router.get('/', videoController.getVideos);
// CREATE Video
/**
 * @swagger
 * /videos:
 *   post:
 *     summary: Create a video
 *     tags: [Videos]
 *     responses:
 *       201:
 *         description: Returns the data of the video created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 */
router.post('/', videoController.createVideo);
// COUNT Videos
/**
 * @swagger
 * /videos/count:
 *   get:
 *     summary: Count videos
 *     tags: [Videos]
 *     responses:
 *       201:
 *         description: Return the total amount of videos in the DB
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                    count:
 *                       type: integer
 *                       description: number of videos retrieved from DB
 *                       example: 5
 */
router.get('/count', videoController.countVideos);
// GET ONE Video
/**
 * @swagger
 * /videos/{id}:
 *   get:
 *     summary: Get a video by ID
 *     tags: [Videos]
 *     responses:
 *       200:
 *         description: Returns one video matching the given ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Video'
 */
router.get('/:id', videoController.getOneVideo);
// UPDATE Video
/**
 * @swagger
 * /videos/{id}:
 *   put:
 *     summary: Update a video by ID
 *     tags: [Videos]
 *     responses:
 *       201:
 *         description: Returns the updated data of the video
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Video'
 */
router.put('/:id', videoController.updateVideo);
// DELETE Video
/**
 * @swagger
 * /videos/{id}:
 *   delete:
 *     summary: Delete a video by ID
 *     tags: [Videos]
 *     responses:
 *       201:
 *         description: Returns the data of the video deleted
 *         content:
 *           application/json:
 *             schema:
 *                  $ref: '#/components/schemas/Video'
 */
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
