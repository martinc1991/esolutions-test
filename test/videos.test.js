const { app, server } = require('../app.js');
const sequelize = require('../database');
const supertest = require('supertest');
const request = supertest(app);

const videoPost_1 = {
	title: 'Title 1',
	description: 'Description 1',
	source_1: 'URL 1',
	source_2: '',
	thumb: 'Thumb 1',
	categories: ['cats', 'animals'],
};
const videoPost_2 = {
	title: 'Title 2',
	description: 'Description 2',
	source_1: 'URL 2',
	source_2: '',
	thumb: 'Thumb 2',
	categories: ['cats', 'animals'],
};
const videoPost_3 = {
	title: 'Title 3',
	description: 'Description 3',
	source_1: 'URL 3',
	source_2: '',
	thumb: 'Thumb 3',
	categories: ['tech', 'music'],
};

// SETUP
beforeEach(function truncateDatabase(done) {
	Object.values(sequelize.models).map(function (model) {
		return model.destroy({ truncate: true });
	});
	done();
});

beforeEach(() => {
	server.close();
});

afterAll(() => {
	server.close();
});
// SETUP

describe('GET /videos', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/videos');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/videos');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it('Responds with an object with the right properties and values', async () => {
		const { body } = await request.get('/videos');
		expect(body).toEqual({ count: 0, data: [] });
	});
});

describe('GET /videos/:id', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/videos/1');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/videos/1');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it('Responds with only one element', async () => {
		const { body: video_created } = await request.post('/videos').send(videoPost_3);
		const id = video_created.id;
		const { body } = await request.get('/videos/' + id);
		expect(body.count).toBe(1);
	});

	it('Responds with the video data when searched by id', async () => {
		const { body: video_created } = await request.post('/videos').send(videoPost_2);
		const id = video_created.id;
		const { body: video_received } = await request.get('/videos/' + id);

		expect(video_received.data).toHaveProperty('id', id);
		expect(video_received.data).toHaveProperty('title', videoPost_2.title);
		expect(video_received.data).toHaveProperty('title', videoPost_2.title);
		expect(video_received.data).toHaveProperty('description', videoPost_2.description);
		expect(video_received.data).toHaveProperty('source_1', videoPost_2.source_1);
		expect(video_received.data).toHaveProperty('source_2', videoPost_2.source_2);
		expect(video_received.data).toHaveProperty('thumb', videoPost_2.thumb);
	});
});

describe('GET /videos/count', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/videos/count');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/videos/count');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it("Responds with an object with the right properties and values when there's no videos", async () => {
		const { body } = await request.get('/videos/count');
		expect(body).toEqual({ count: 0 });
	});

	it('Responds with an object with the right properties and values', async () => {
		await request.post('/videos').send(videoPost_1);
		const { body } = await request.get('/videos/count');

		expect(body.count).toBe(1);
	});
});

describe('POST /videos', () => {
	it('Responds with status code 201', async () => {
		const { statusCode } = await request.post('/videos').send(videoPost_1);
		expect(statusCode).toBe(201);
	});

	it('Responds with the data of the video created', async () => {
		const { body: body_1 } = await request.post('/videos').send(videoPost_1);
		const { body: body_2 } = await request.post('/videos').send(videoPost_2);

		expect(body_1).toHaveProperty('title', videoPost_1.title);
		expect(body_1).toHaveProperty('description', videoPost_1.description);
		expect(body_1).toHaveProperty('source_1', videoPost_1.source_1);
		expect(body_1).toHaveProperty('source_2', videoPost_1.source_2);
		expect(body_1).toHaveProperty('thumb', videoPost_1.thumb);

		expect(body_2).toHaveProperty('title', videoPost_2.title);
		expect(body_2).toHaveProperty('description', videoPost_2.description);
		expect(body_2).toHaveProperty('source_1', videoPost_2.source_1);
		expect(body_2).toHaveProperty('source_2', videoPost_2.source_2);
		expect(body_2).toHaveProperty('thumb', videoPost_2.thumb);
	});

	it('Generates an "id" property for the video', async () => {
		const { body } = await request.post('/videos').send(videoPost_1);

		expect(body).toHaveProperty('id');
	});

	it("Creates the categories sent (if they don't exist)", async () => {
		const { body: categories_1 } = await request.get('/categories/count');
		const count_1 = categories_1.count;
		const { body } = await request.post('/videos').send(videoPost_1);

		const { body: categories_2 } = await request.get('/categories');

		expect(count_1).toBe(0);
		expect(categories_2).toHaveProperty('data');
		expect(categories_2).toHaveProperty('count', 2);
	});

	it('Responds with an error if the title is null', async () => {
		let incorrectBody = { ...videoPost_1 };
		incorrectBody.title = null;
		const { body, statusCode } = await request.post('/videos').send(incorrectBody);

		expect(statusCode).toBe(500);
		expect(body).toHaveProperty('error', true);
		expect(body).toHaveProperty('message');
		expect(body.message).toMatch(/notNull Violation/);
	});

	it('Responds with an error if the description is null', async () => {
		let incorrectBody = { ...videoPost_1 };
		incorrectBody.description = null;
		const { body, statusCode } = await request.post('/videos').send(incorrectBody);

		expect(statusCode).toBe(500);
		expect(body).toHaveProperty('error', true);
		expect(body).toHaveProperty('message');
		expect(body.message).toMatch(/notNull Violation/);
	});

	it('Responds with an error if the source_1 is null (but not if source_2)', async () => {
		let incorrectBody_1 = { ...videoPost_1 };
		let incorrectBody_2 = { ...videoPost_2 };

		incorrectBody_1.source_1 = null;
		const { body: body_1, statusCode: statusCode_1 } = await request.post('/videos').send(incorrectBody_1);

		expect(statusCode_1).toBe(500);
		expect(body_1).toHaveProperty('error', true);
		expect(body_1).toHaveProperty('message');
		expect(body_1.message).toMatch(/notNull Violation/);

		incorrectBody_2.source_2 = null;
		const { body: body_2, statusCode: statusCode_2 } = await request.post('/videos').send(incorrectBody_2);

		expect(statusCode_2).toBe(201);
		expect(body_2).not.toHaveProperty('error');
	});
});

describe('PUT /videos', () => {
	it('Responds with status code 500 when try to modify an inexistent video', async () => {
		const { statusCode } = await request.put('/videos/1').send(videoPost_1);
		expect(statusCode).toBe(500);
	});
	it('Responds with status code 201 when successfully modified a video', async () => {
		const { body: video_sent } = await request.post('/videos').send(videoPost_1);
		const id = video_sent.id;
		const { statusCode } = await request.put('/videos/' + id).send({ title: 'Updated title', description: 'Updated description' });
		expect(statusCode).toBe(201);
	});
	it('Responds with the data of the modified video', async () => {
		const { body: video_sent } = await request.post('/videos').send(videoPost_2);
		const id = video_sent.id;
		const { body: video_received } = await request.put('/videos/' + id).send({ title: 'Updated title', description: 'Updated description' });

		expect(video_received).toHaveProperty('title', 'Updated title');
		expect(video_received).toHaveProperty('description', 'Updated description');
		expect(video_received).toHaveProperty('source_1', videoPost_2.source_1);
		expect(video_received).toHaveProperty('source_2', videoPost_2.source_2);
		expect(video_received).toHaveProperty('thumb', videoPost_2.thumb);
	});
});

describe('DELETE /videos', () => {
	it('Responds with status code 500 when try to delete an inexistent video', async () => {
		const { statusCode } = await request.delete('/videos/1').send(videoPost_1);
		expect(statusCode).toBe(500);
	});

	it('Responds with status code 201 when deleted successfully a video', async () => {
		const { body } = await request.post('/videos').send(videoPost_1);
		const id = body.id;
		const { statusCode } = await request.delete('/videos/' + id);
		expect(statusCode).toBe(201);
	});

	it('Responds with status and the data of the deleted video', async () => {
		const { body: video_sent } = await request.post('/videos').send(videoPost_2);
		const id = video_sent.id;
		const { body: video_received } = await request.delete('/videos/' + id);

		expect(video_received).toHaveProperty('title', videoPost_2.title);
		expect(video_received).toHaveProperty('description', videoPost_2.description);
		expect(video_received).toHaveProperty('source_1', videoPost_2.source_1);
		expect(video_received).toHaveProperty('source_2', videoPost_2.source_2);
		expect(video_received).toHaveProperty('thumb', videoPost_2.thumb);
	});
});
