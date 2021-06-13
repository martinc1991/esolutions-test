require('dotenv').config();
var morgan = require('morgan');
const express = require('express');
const sequelize = require('./database');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const VideoRouter = require('./routes/VideoRouter.js');
const CategoryRouter = require('./routes/CategoryRouter.js');
require('./models/associations/associations');

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'E-Solutions Test API',
			version: '1.0.0',
			description: 'API for E-Solutions challenge',
		},
		servers: [
			{
				url: 'http://localhost:5000',
			},
		],
	},
	apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

const app = express();

// Docs
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs)); // http://localhost:5000/api-docs/

// Middlewares
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/videos', VideoRouter);
app.use('/categories', CategoryRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log('App is running on port', PORT);

	// Connect to DB
	sequelize.sync({ force: true }).then(() => {
		console.log('Connected to DB');
	});
});
