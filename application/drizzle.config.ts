import { defineConfig } from 'drizzle-kit'

export default defineConfig({
    dialect: 'mysql',
    schema: './src/lib/drizzle/schema',
    out: './src/lib/drizzle/migrations',
    dbCredentials:{
        url: process.env.DATABASE_URL as string
    },
    verbose:true,  // tell us what will be changes
    strict: true   // need confirmation before changes apply to database schema
  })


