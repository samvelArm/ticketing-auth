import request from 'supertest';
import { app } from '../../app';

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app).post('/api/users/signout').send({}).expect(200);

  const response = await request(app)
    .get('/api/users/currentuser')
    .send({})
    .expect(200);

  expect(response.body.currentUser).toEqual(null);
  const cookie = response.get('Set-Cookie');
  expect(cookie).not.toBeDefined();
});
