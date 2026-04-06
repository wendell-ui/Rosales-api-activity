const request = require('supertest');
const app = require('../../../server'); // Import our Express app
const dbHelper = require('./dbHelper'); // Import our RAM Database
const Room = require('../../models/roomModel'); // Room model for testing

// Set up and tear down the database
beforeAll(async () => await dbHelper.connect(), 30000); // 30 second timeout for setup
afterEach(async () => await dbHelper.clearDatabase());
afterAll(async () => await dbHelper.closeDatabase());

describe('Integration Test: Room API', () => {
  let authToken;

  beforeAll(async () => {
    // Register and login a manager user for testing
    const userData = {
      name: 'Test Manager',
      email: 'manager@test.com',
      password: 'password123',
      role: 'manager'
    };

    // Register the user
    await request(app)
      .post('/api/v1/auth/register')
      .send(userData);

    // Login to get token
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({
        email: 'manager@test.com',
        password: 'password123'
      });

    authToken = loginResponse.body.token;
  });

  it('POST /api/v1/rooms - should physically save a room to the database', async () => {
    // 1. Arrange: Prepare the fake payload
    const newRoom = {
      name: 'Integration Suite',
      type: 'Deluxe',
      price: 5000,
      isBooked: false
    };

    // 2. Act: Use Supertest to simulate an HTTP POST request with auth
    const response = await request(app)
      .post('/api/v1/rooms')
      .set('Authorization', `Bearer ${authToken}`)
      .send(newRoom);

    // 3. Assert (HTTP): Check the response from the API
    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe('Integration Suite');

    // 4. Assert (Database): VERIFY IT ACTUALLY SAVED IN THE DATABASE!
    const savedRoom = await Room.findOne({ name: 'Integration Suite' });
    expect(savedRoom).toBeTruthy(); // Ensure it is not null
    expect(savedRoom.price).toBe(5000);
  });

  it('GET /api/v1/rooms - should return an empty array if DB is empty', async () => {
    // Remember: afterEach clears the database, so it should be empty here!
    const response = await request(app).get('/api/v1/rooms');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0); // Should be empty
  });

});
