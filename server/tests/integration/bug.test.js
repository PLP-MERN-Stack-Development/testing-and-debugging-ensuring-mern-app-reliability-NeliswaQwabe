const request = require('supertest');
const app = require('../../server'); // Assuming your Express app is exported here
const Bug = require('../../models/bug.model');

// Mock the Mongoose Bug Model
jest.mock('../../models/bug.model'); 

describe('Bug API Integration Tests', () => {
  const mockBug = { _id: '5f8b9d8a', title: 'Test Bug', status: 'open' };

  test('POST /api/bugs should create a new bug', async () => {
    // 1. Mock the DB call (Bug.create) to return the mock bug
    Bug.create.mockResolvedValueOnce(mockBug); 

    const response = await request(app)
      .post('/api/bugs')
      .send({ title: 'New Bug', description: 'Details' });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe('Test Bug');
    // 2. Verify that the mocked function was actually called
    expect(Bug.create).toHaveBeenCalled(); 
  });
});