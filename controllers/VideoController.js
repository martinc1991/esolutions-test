const Video = require('../models/Video.js');
const Category = require('../models/Category.js');
const errorFormatter = require('../utils/errorFormatter');

exports.getVideos = async (req, res) => {
	try {
		const videos = await Video.findAll({
			include: [
				{
					model: Category,
					attributes: ['id', 'name'],
					through: { attributes: [] },
				},
			],
		});
		res.status(200).json({
			count: videos.length,
			data: videos,
		});
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.createVideo = async (req, res) => {
	try {
		const { title, description, source_1, source_2, thumb, categories } = req.body;
		const video = await Video.create({ title, description, source_1, source_2, thumb });

		for (const cat in categories) {
			const category = await Category.findOrCreate({ where: { name: categories[cat] } });
			await video.addCategory(category[0]);
		}

		res.status(201).json(video);
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.countVideos = async (req, res) => {
	try {
		const count = await Video.count({});
		res.status(200).json({ count });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.getOneVideo = async (req, res) => {
	try {
		const id = req.params.id;
		const videos = await Video.findAll({
			include: [
				{
					model: Category,
					attributes: ['name'],
					through: { attributes: [] },
				},
			],
		});
		const video = videos.filter((video) => {
			return video.id == id;
		})[0];
		res.status(200).json({ count: videos.length, data: video });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.updateVideo = async (req, res) => {
	try {
		const id = req.params.id;
		const { title, description, sources, thumb, categories } = req.body;

		let video = await Video.findOne({ where: { id: id } });

		if (title) video.title = title;
		if (description) video.description = description;
		if (sources) video.sources = sources;
		if (thumb) video.thumb = thumb;
		if (categories) {
			const userCategories = await video.getCategories();
			await video.removeCategories(userCategories);
			for (const cat in categories) {
				const category = await Category.findOrCreate({ where: { name: categories[cat] } });
				await video.addCategory(category[0]);
			}
		}
		await video.save();
		res.status(201).json(video);
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.deleteVideo = async (req, res) => {
	try {
		const id = req.params.id;
		let deletedVideo = await Video.findOne({ where: { id: id } });
		await deletedVideo.destroy();
		res.status(201).json(deletedVideo);
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};
