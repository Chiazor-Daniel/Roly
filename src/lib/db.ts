import { Pool } from 'pg';

if (!process.env.POSTGRES_URL) {
  throw new Error('Missing POSTGRES_URL environment variable');
}

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

async function createTableIfNotExists() {
    const client = await pool.connect();
    try {
        await client.query(`
            CREATE TABLE IF NOT EXISTS registrations (
                id SERIAL PRIMARY KEY,
                first_name VARCHAR(255) NOT NULL,
                last_name VARCHAR(255) NOT NULL,
                street_address TEXT NOT NULL,
                email VARCHAR(255) NOT NULL UNIQUE,
                affiliation VARCHAR(255) NOT NULL,
                registration_date DATE NOT NULL,
                status VARCHAR(100) NOT NULL,
                payment_method VARCHAR(100) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
            );
        `);
    } finally {
        client.release();
    }
}

// Ensure the table is created when the app starts
createTableIfNotExists().catch(console.error);
