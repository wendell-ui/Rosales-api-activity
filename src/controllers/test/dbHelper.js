const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;

// 1. Create a new memory database and connect Mongoose to it
exports.connect = async () => {
  try {
    // Disconnect from any existing connection first
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }

    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri);
  } catch (error) {
    console.error('Failed to connect to in-memory database:', error);
    throw error;
  }
};

// 2. Drop the database, close the connection, and stop the server
exports.closeDatabase = async () => {
  try {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
    if (mongoServer) {
      await mongoServer.stop();
    }
  } catch (error) {
    console.error('Failed to close database:', error);
    throw error;
  }
};

// 3. Delete all data from all collections (Run this between tests!)
exports.clearDatabase = async () => {

const collections = mongoose.connection.collections;
for (const key in collections) {
const collection = collections[key];
await collection.deleteMany();
}
};