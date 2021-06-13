const Video = require('../Video');
const Category = require('../Category');

Video.belongsToMany(Category, { through: 'VideoCategories', timestamps: false });
Category.belongsToMany(Video, { through: 'VideoCategories', timestamps: false });
