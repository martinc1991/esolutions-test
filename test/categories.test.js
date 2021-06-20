const { app, server } = require('../app.js');
const sequelize = require('../database');
const supertest = require('supertest');
const request = supertest(app);

const categoryPost_1 = { name: 'cats' };
const categoryPost_2 = { name: 'music' };
const categoryPost_3 = { name: 'cooking' };

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

describe('GET /categories', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/categories');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/categories');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it('Responds with an object with the right properties and values', async () => {
		const { body } = await request.get('/categories');
		expect(body).toEqual({ count: 0, data: [] });
	});
});

describe('GET /categories/:id', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/categories/1');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/categories/1');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it('Responds with only one element', async () => {
		const { body: category_created } = await request.post('/categories').send(categoryPost_1);
		const id = category_created.id;
		const { body } = await request.get('/categories/' + id);
		expect(body.count).toBe(1);
	});

	it('Responds with the category data when searched by id', async () => {
		const { body: category_created } = await request.post('/categories').send(categoryPost_1);
		const id = category_created.id;
		const { body: category_received } = await request.get('/categories/' + id);

		expect(category_received.data).toHaveProperty('id', id);
		expect(category_received.data).toHaveProperty('name', categoryPost_1.name);
	});
});

describe('GET /categories/count', () => {
	it('Responds with status code 200', async () => {
		const { statusCode } = await request.get('/categories/count');
		expect(statusCode).toBe(200);
	});

	it('Responds with JSON', async () => {
		const { headers } = await request.get('/categories/count');
		expect(headers['content-type']).toBe('application/json; charset=utf-8');
	});

	it("Responds with an object with the right properties and values when there's no categories", async () => {
		const { body } = await request.get('/categories/count');
		expect(body).toEqual({ count: 0 });
	});

	it('Responds with an object with the right properties and values', async () => {
		await request.post('/categories').send(categoryPost_1);
		const { body } = await request.get('/categories/count');
		expect(body).toEqual({ count: 1 });
	});
});

describe('POST /categories', () => {
	it('Responds with status code 201', async () => {
		const { statusCode } = await request.post('/categories').send(categoryPost_1);
		expect(statusCode).toBe(201);
	});

	it('Responds with an error if the name is null', async () => {
		let incorrectBody = { name: null };
		const { body, statusCode } = await request.post('/categories').send(incorrectBody);

		expect(statusCode).toBe(500);
		expect(body).toHaveProperty('error', true);
		expect(body).toHaveProperty('message');
		expect(body.message).toMatch(/notNull Violation/);
	});

	it('Responds with the data of the category created', async () => {
		const { body: body_1 } = await request.post('/categories').send(categoryPost_1);
		const { body: body_2 } = await request.post('/categories').send(categoryPost_2);

		expect(body_1).toHaveProperty('name', categoryPost_1.name);
		expect(body_2).toHaveProperty('name', categoryPost_2.name);
	});

	it('Generates an "id" property for the category', async () => {
		const { body } = await request.post('/categories').send(categoryPost_1);

		expect(body).toHaveProperty('id');
	});
});

describe('PUT /categories', () => {
	it('Responds with status code 500 when try to modify an inexistent category', async () => {
		const { statusCode } = await request.put('/categories/1').send(categoryPost_1);
		expect(statusCode).toBe(500);
	});

	it('Responds with status code 201 when successfully modified a category', async () => {
		const { body: category_sent } = await request.post('/categories').send(categoryPost_1);
		const id = category_sent.id;
		const { statusCode } = await request.put('/categories/' + id).send({ name: 'Updated name' });
		expect(statusCode).toBe(201);
	});

	it('Responds with the data of the modified category', async () => {
		const { body: category_sent } = await request.post('/categories').send(categoryPost_3);
		const id = category_sent.id;
		const { body: category_received } = await request.put('/categories/' + id).send({ name: 'Updated name' });

		expect(category_received).toHaveProperty('name', 'Updated name');
	});
});

describe('DELETE /categories', () => {
	it('Responds with status code 500 when try to delete an inexistent category', async () => {
		const { statusCode } = await request.delete('/categories/1').send(categoryPost_1);
		expect(statusCode).toBe(500);
	});

	it('Responds with status code 201 when deleted successfully a category', async () => {
		const { body } = await request.post('/categories').send(categoryPost_1);
		const id = body.id;
		const { statusCode } = await request.delete('/categories/' + id);
		expect(statusCode).toBe(201);
	});
	it('Responds with status and the data of the deleted category', async () => {
		const { body: category_sent } = await request.post('/categories').send(categoryPost_2);
		const id = category_sent.id;
		const { body: category_received } = await request.delete('/categories/' + id);

		expect(category_received).toHaveProperty('name', categoryPost_2.name);
	});
});
