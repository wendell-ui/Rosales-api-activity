const { getAllRooms, createRoom } = require('../roomController');
const Room = require('../../models/roomModel');
const httpMocks = require('node-mocks-http');

// TELL JEST TO MOCK THE DATABASE MODEL
jest.mock('../../models/roomModel');

describe('Room Controller Unit Tests', () => {

let req, res;

// This runs BEFORE every test. It resets our fake Request and Response objects.
beforeEach(() => {
req = httpMocks.createRequest();
res = httpMocks.createResponse();
});

describe('GET /rooms (getAllRooms)', () => {
it('should return 200 OK and a list of rooms', async () => {
// 1. Arrange: Setup the fake data and force the mock DB to return it
const fakeData = [{ name: 'Room 1', capacity: 10 }, { name: 'Room 2', capacity: 20 }];
Room.find.mockResolvedValue(fakeData);

// 2. Act: Call the controller function
await getAllRooms(req, res);

// 3. Assert: Verify the results
expect(res.statusCode).toBe(200);
expect(res._getJSONData()).toStrictEqual(fakeData);
expect(Room.find).toHaveBeenCalledTimes(1);
});

it('should return 500 Internal Server Error if database crashes', async () => {
// 1. Arrange: Force the DB to throw an error
Room.find.mockRejectedValue(new Error('DB Connection Lost'));

// 2. Act
await getAllRooms(req, res);

// 3. Assert
expect(res.statusCode).toBe(500);
expect(res._getJSONData()).toStrictEqual({ message: 'DB Connection Lost' });
});
});

describe('POST /rooms (createRoom)', () => {
it('should return 201 Created and the new room', async () => {
// 1. Arrange
req.body = { name: 'Room 1', type: 'Suite', price: 100 };
const fakeSavedRoom = { _id: '12345', name: 'Room 1', type: 'Suite', price: 100 };
Room.create.mockResolvedValue(fakeSavedRoom); // Mock the create method

// 2. Act
await createRoom(req, res);

// 3. Assert
expect(res.statusCode).toBe(201);
expect(res._getJSONData()).toStrictEqual(fakeSavedRoom);
expect(Room.create).toHaveBeenCalledWith(req.body);
});
});
});