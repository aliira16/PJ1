import { pgTable, serial, varchar, integer, numeric, timestamp } from 'drizzle-orm/pg-core';

export const cars = pgTable('demo_users', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 100 }).notNull(),
    model: varchar('model', { length: 100 }).notNull(),
    year: integer('year').notNull(),
    price: numeric('price', { precision: 10, scale: 2 }).notNull(),
    createdAt: timestamp('createdAt').defaultNow()
});

