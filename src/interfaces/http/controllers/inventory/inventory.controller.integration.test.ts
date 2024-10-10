import request from 'supertest';
import db from '@persistence/db';
import app from '../../../../app/app';

describe('Inventory Integration Tests', () => {
  beforeAll(async () => {
    await db.sequelize.sync({ force: true }); // Sync DB for testing
  });

  it('should fetch inventory from DB', async () => {
    await db.Inventory.create({ id: 1, name: 'item1', quantity: 100 });

    const res = await request(app).get('/api/inventory');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual([{ id: 1, name: 'item1', quantity: 100 }]);
  });
});
