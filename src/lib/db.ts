import { Pool } from 'pg';

// IMPORTANT: For production applications, it is strongly recommended 
// to use environment variables instead of hardcoding connection strings.
const connectionString = "postgresql://roly_user:1ctCejXbVVrZBEe7tLnZcpBlNeTnwzHY@dpg-d2685nnfte5s73eftvqg-a.oregon-postgres.render.com/roly";

if (!connectionString) {
  throw new Error('Database connection string is not set.');
}

export const pool = new Pool({
  connectionString,
  ssl: true,
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
