import { mysqlTable, primaryKey, int, varchar, date, double } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const flyer = mysqlTable("flyer", {
	flyerId: int("flyer_id").autoincrement().notNull(),
	importedFlyerId: varchar("imported_flyer_id", { length: 255 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	validFrom: date("valid_from", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	validTo: date("valid_to", { mode: 'string' }),
},
(table) => {
	return {
		flyerFlyerId: primaryKey({ columns: [table.flyerId], name: "flyer_flyer_id"}),
	}
});

export const flyerImage = mysqlTable("flyer_image", {
	flyerImageId: int("flyer_image_id").autoincrement().notNull(),
	flyerImageUrl: varchar("flyer_image_url", { length: 512 }),
	flyerId: int("flyer_id").references(() => flyer.flyerId),
},
(table) => {
	return {
		flyerImageFlyerImageId: primaryKey({ columns: [table.flyerImageId], name: "flyer_image_flyer_image_id"}),
	}
});

export const flyerStore = mysqlTable("flyer_store", {
	flyerId: int("flyer_id").notNull().references(() => flyer.flyerId),
	storeId: int("store_id").notNull().references(() => store.storeId),
},
(table) => {
	return {
		flyerStoreFlyerIdStoreId: primaryKey({ columns: [table.flyerId, table.storeId], name: "flyer_store_flyer_id_store_id"}),
	}
});

export const grocery = mysqlTable("grocery", {
	groceryId: int("grocery_id").autoincrement().notNull(),
	groceryName: varchar("grocery_name", { length: 255 }),
},
(table) => {
	return {
		groceryGroceryId: primaryKey({ columns: [table.groceryId], name: "grocery_grocery_id"}),
	}
});

export const pointHistory = mysqlTable("point_history", {
	pointHistoryId: int("point_history_id").autoincrement().notNull(),
	point: int("point"),
	productId: int("product_id").references(() => product.productId),
	flyerId: int("flyer_id").references(() => flyer.flyerId),
},
(table) => {
	return {
		pointHistoryPointHistoryId: primaryKey({ columns: [table.pointHistoryId], name: "point_history_point_history_id"}),
	}
});

export const priceHistory = mysqlTable("price_history", {
	priceHistoryId: int("price_history_id").autoincrement().notNull(),
	price: double("price"),
	unit: varchar("unit", { length: 10 }),
	pricePerQuantity: double("price_per_quantity"),
	quantity: double("quantity"),
	memberPrice: double("member_price"),
	originalPrice: double("original_price"),
	productId: int("product_id").references(() => product.productId),
	flyerId: int("flyer_id").references(() => flyer.flyerId),
},
(table) => {
	return {
		priceHistoryPriceHistoryId: primaryKey({ columns: [table.priceHistoryId], name: "price_history_price_history_id"}),
	}
});

export const product = mysqlTable("product", {
	productId: int("product_id").autoincrement().notNull(),
	importedProductCode: varchar("imported_product_code", { length: 255 }),
	productName: varchar("product_name", { length: 255 }),
	brand: varchar("brand", { length: 255 }),
	packageSize: int("package_size"),
	packageUnit: varchar("package_unit", { length: 10 }),
	imageUrl: varchar("image_url", { length: 255 }),
	groceryId: int("grocery_id").references(() => grocery.groceryId),
},
(table) => {
	return {
		productProductId: primaryKey({ columns: [table.productId], name: "product_product_id"}),
	}
});

export const store = mysqlTable("store", {
	storeId: int("store_id").autoincrement().notNull(),
	importedStoreId: varchar("imported_store_id", { length: 255 }),
	storeName: varchar("store_name", { length: 255 }),
	address: varchar("address", { length: 255 }),
	postalCode: varchar("postal_code", { length: 10 }),
	groceryId: int("grocery_id").references(() => grocery.groceryId),
},
(table) => {
	return {
		storeStoreId: primaryKey({ columns: [table.storeId], name: "store_store_id"}),
	}
});