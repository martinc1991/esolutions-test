const express = require('express');
const router = express.Router();
const videoController = require('../controllers/VideoController');

// GET Videos
router.get('/', videoController.getVideos);
// CREATE Video
router.post('/', videoController.createVideo);
// COUNT Videos
router.get('/count', videoController.countVideos);
// GET ONE Video
router.get('/:id', videoController.getOneVideo);
// UPDATE Video
router.put('/:id', videoController.updateVideo);
// DELETE Video
router.delete('/:id', videoController.deleteVideo);

module.exports = router;
