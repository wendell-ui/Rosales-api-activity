const { protect } = require('../../middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const User = require('../../models/userModel');
const httpMocks = require('node-mocks-http');

jest.mock('jsonwebtoken');
jest.mock('../../models/userModel');

describe('Auth Middleware - protect', () => {
let req, res, next;

beforeEach(() => {
req = httpMocks.createRequest();
res = httpMocks.createResponse();
next = jest.fn(); // Create a fake 'next' function
});

it('should call next() if token is valid', async () => {
// Arrange
req.headers.authorization = 'Bearer valid_fake_token';
jwt.verify.mockReturnValue({ id: 'user123' }); // Mock JWT decoding

User.findById.mockReturnValue({ select: jest.fn().mockResolvedValue({ _id: 'user123',
name: 'John' }) });

// Act
await protect(req, res, next);

// Assert
expect(jwt.verify).toHaveBeenCalled();
expect(next).toHaveBeenCalledTimes(1); // It successfully moved to the next function!
});

it('should return 401 if no token is provided', async () => {
// Arrange: Leave req.headers empty

// Act
await protect(req, res, next);

// Assert
expect(res.statusCode).toBe(401);
expect(res._getJSONData()).toStrictEqual({ message: 'Not authorized, no token provided' });
expect(next).not.toHaveBeenCalled(); // It blocked the user!
});
});