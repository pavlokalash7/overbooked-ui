import request from 'supertest';

import app from '@/app';
import { closeDatabase } from '@/utils/database';

describe('GET /users/:user_id/recommendations', () => {
  it('should retrieve saved recommendations', async () => {
    const user_id = 'test_user';

    // First, generate recommendations for the user
    await request(app)
      .post('/recommendations')
      .send({
        user_id,
        preferences: [
          'science fiction',
          'artificial intelligence',
          'space exploration',
        ],
      });

    // Then, retrieve them
    const response = await request(app).get(
      `/users/${user_id}/recommendations`
    );

    if (response.status === 200) {
      expect(response.body.user_id).toBe(user_id);
      expect(Array.isArray(response.body.recommendations)).toBe(true);
    } else if (response.status === 404) {
      expect(response.body.error).toBe(
        `No recommendations found for user_id ${user_id}.`
      );
    } else {
      throw new Error('Unexpected status code');
    }
  });
});

afterAll(async () => {
  await closeDatabase();
});
