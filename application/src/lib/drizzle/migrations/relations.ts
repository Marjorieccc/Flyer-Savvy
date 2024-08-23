import { relations } from "drizzle-orm/relations";
import { flyer, flyerImage, flyerStore, store, pointHistory, product, priceHistory, grocery } from "./schema";

export const flyerImageRelations = relations(flyerImage, ({one}) => ({
	flyer: one(flyer, {
		fields: [flyerImage.flyerId],
		references: [flyer.flyerId]
	}),
}));

export const flyerRelations = relations(flyer, ({many}) => ({
	flyerImages: many(flyerImage),
	flyerStores: many(flyerStore),
	pointHistories: many(pointHistory),
	priceHistories: many(priceHistory),
}));

export const flyerStoreRelations = relations(flyerStore, ({one}) => ({
	flyer: one(flyer, {
		fields: [flyerStore.flyerId],
		references: [flyer.flyerId]
	}),
	store: one(store, {
		fields: [flyerStore.storeId],
		references: [store.storeId]
	}),
}));

export const storeRelations = relations(store, ({one, many}) => ({
	flyerStores: many(flyerStore),
	grocery: one(grocery, {
		fields: [store.groceryId],
		references: [grocery.groceryId]
	}),
}));

export const pointHistoryRelations = relations(pointHistory, ({one}) => ({
	flyer: one(flyer, {
		fields: [pointHistory.flyerId],
		references: [flyer.flyerId]
	}),
	product: one(product, {
		fields: [pointHistory.productId],
		references: [product.productId]
	}),
}));

export const productRelations = relations(product, ({one, many}) => ({
	pointHistories: many(pointHistory),
	priceHistories: many(priceHistory),
	grocery: one(grocery, {
		fields: [product.groceryId],
		references: [grocery.groceryId]
	}),
}));

export const priceHistoryRelations = relations(priceHistory, ({one}) => ({
	flyer: one(flyer, {
		fields: [priceHistory.flyerId],
		references: [flyer.flyerId]
	}),
	product: one(product, {
		fields: [priceHistory.productId],
		references: [product.productId]
	}),
}));

export const groceryRelations = relations(grocery, ({many}) => ({
	products: many(product),
	stores: many(store),
}));