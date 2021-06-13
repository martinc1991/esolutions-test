const Video = require('../models/Video.js');
const Category = require('../models/Category.js');
const errorFormatter = require('../utils/errorFormatter');

exports.getCategories = async (req, res) => {
	try {
		const categories = await Category.findAll({
			attributes: { exclude: ['id'] },
			include: [
				{
					model: Video,
					attributes: ['title', 'description', 'source_1', 'source_2', 'thumb'],
					through: {
						attributes: [],
					},
				},
			],
		});
		res.status(200).json({ categories });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.createCategory = async (req, res) => {
	try {
		const name = req.body.name;
		const category = await Category.create({ name });
		res.status(201).json({ status: 'success', data: category });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.countCategories = async (req, res) => {
	try {
		const count = await Category.count({});
		res.status(200).json({ count });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.getOneCategory = async (req, res) => {
	try {
		const id = req.params.id;
		const categories = await Category.findAll({ include: [{ model: Video, attributes: ['title', 'thumb'], through: { attributes: [] } }] });
		const category = categories.filter((cat) => {
			return cat.id == id;
		});
		res.status(200).json(category);
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.updateCategory = async (req, res) => {
	try {
		const id = req.params.id;
		const name = req.body.name;
		const category = await Category.findOne({ where: { id: id } });
		category.name = name;
		await category.save();
		res.status(201).json({ status: 'Updated successfully', data: category });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};

exports.deleteCategory = async (req, res) => {
	try {
		const id = req.params.id;
		let deletedCategory = await Category.findOne({ where: { id: id } });

		await deletedCategory.destroy();
		res.status(201).json({ status: 'Removed successfully', data: deletedCategory });
	} catch (error) {
		res.status(500).send(errorFormatter(error));
	}
};
