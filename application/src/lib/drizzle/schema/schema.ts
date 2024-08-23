// This file defines the database schema using Drizzle ORM for various entities.

import { mysqlTable, int, double,varchar, date, primaryKey} from 'drizzle-orm/mysql-core';

export const grocery = mysqlTable('grocery', {
	grocery_id: int('grocery_id').primaryKey().autoincrement().notNull(),
	grocery_name: varchar('grocery_name', { length: 255 }),
});

export const store = mysqlTable('store', {
	store_id: int('store_id').primaryKey().autoincrement().notNull(),
	imported_store_id: varchar('imported_store_id', { length: 255 }),
	store_name: varchar('store_name', { length: 255 }),
	address: varchar('address', { length: 255 }),
	postal_code: varchar('postal_code', { length: 10 }),
	grocery_id: int('grocery_id').references(() => grocery.grocery_id),
});

export const flyer = mysqlTable('flyer', {
	flyer_id: int('flyer_id').primaryKey().autoincrement().notNull(),
	imported_flyer_id: varchar('imported_flyer_id', { length: 255 }),
	valid_from: date('valid_from', { mode: 'date' }),
	valid_to: date('valid_to', { mode: 'date' }),
});

export const flyer_image = mysqlTable('flyer_image', {
	flyer_image_id: int('flyer_image_id').primaryKey().autoincrement().notNull(),
	flyer_image_url: varchar('flyer_image_url', { length: 512 }),
	flyer_id: int('flyer_id').references(() => flyer.flyer_id),
});

export const flyer_store = mysqlTable('flyer_store', {
	flyer_id: int('flyer_id').references(() => flyer.flyer_id),
	store_id: int('store_id').references(() => store.store_id),
}, (table) => {
    return {
      flyer_store_id: primaryKey({ columns: [table.flyer_id, table.store_id] }),
    };
});

export const product = mysqlTable('product', {
	product_id: int('product_id').primaryKey().autoincrement().notNull(),
	imported_product_code: varchar('imported_product_code', { length: 255 }),
	product_name: varchar('product_name', { length: 255 }),
	brand: varchar('brand', { length: 255 }),
	package_size: int('package_size'),
	package_unit: varchar('package_unit', { length: 10 }),
	image_url: varchar('image_url', { length: 255 }),
	grocery_id: int('grocery_id').references(() => grocery.grocery_id),
});

export const price_history = mysqlTable('price_history', {
	price_history_id: int('price_history_id').primaryKey().autoincrement().notNull(),
	price: double('price'),
	unit: varchar('unit', { length: 10 }),
	price_per_quantity: double('price_per_quantity'),
	quantity: double('quantity'),
	member_price: double('member_price'),
	original_price: double('original_price'),
	product_id: int('product_id').references(() => product.product_id),
	flyer_id: int('flyer_id').references(() => flyer.flyer_id),
});

export const point_history = mysqlTable('point_history', {
	point_history_id: int('point_history_id').primaryKey().autoincrement().notNull(),
	point: int('point'),
	product_id: int('product_id').references(() => product.product_id),
	flyer_id: int('flyer_id').references(() => flyer.flyer_id)
});
