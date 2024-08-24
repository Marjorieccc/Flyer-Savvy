// This file sets up the MySQL database connection using Drizzle ORM and exports the db, schema, and connection.

import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from '@/lib/drizzle/schema/schema'
import fs from 'fs';
import path from 'path';

const caCertPath = path.resolve(process.cwd(), './src/lib/db/ca-cert.pem');
const caCert = fs.readFileSync(caCertPath, 'utf-8');

const connection = mysql.createPool({
  uri: process.env.DATABASE_URL,
  ssl: {
    ca: caCert,
    rejectUnauthorized: true
  },
});

const db = drizzle(connection, { schema, mode: 'default' });

export { db, schema, connection};


