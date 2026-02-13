import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../common/base.repository.js';

@Injectable()
export class WorkerRepository extends BaseRepository {
    async findOrders() {
        const conn = await this.getDb(
            'postgresql',
            'ANALYTICS',
            'analytics_db',
        );

        const result = await conn.query(
            'SELECT id, amount FROM orders LIMIT 10',
        );

        return result.rows ?? result[0];
    }

    async saveOrder(order: any) {
        const conn = await this.getDb('mysql', 'MAIN', 'main_db');

        await conn.query('INSERT INTO orders (id, amount) VALUES (?, ?)', [
            order.id,
            order.amount,
        ]);
    }
}
