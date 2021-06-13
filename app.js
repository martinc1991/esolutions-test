require('dotenv').config();
var morgan = require('morgan');
const express = require('express');
const sequelize = require('./database');
const VideoRouter = require('./routes/VideoRouter.js');
const CategoryRouter = require('./routes/CategoryRouter.js');
require('./models/associations/associations');

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/videos', VideoRouter);
app.use('/categories', CategoryRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
	console.log('App is running on port', port);

	// Connect to DB
	sequelize.sync({ force: true }).then(() => {
		console.log('Connected to DB');
	});
});
