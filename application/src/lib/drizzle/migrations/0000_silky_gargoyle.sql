-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `flyer` (
	`flyer_id` int AUTO_INCREMENT NOT NULL,
	`imported_flyer_id` varchar(255),
	`valid_from` date,
	`valid_to` date,
	CONSTRAINT `flyer_flyer_id` PRIMARY KEY(`flyer_id`)
);
--> statement-breakpoint
CREATE TABLE `flyer_image` (
	`flyer_image_id` int AUTO_INCREMENT NOT NULL,
	`flyer_image_url` varchar(512),
	`flyer_id` int,
	CONSTRAINT `flyer_image_flyer_image_id` PRIMARY KEY(`flyer_image_id`)
);
--> statement-breakpoint
CREATE TABLE `flyer_store` (
	`flyer_id` int NOT NULL,
	`store_id` int NOT NULL,
	CONSTRAINT `flyer_store_flyer_id_store_id` PRIMARY KEY(`flyer_id`,`store_id`)
);
--> statement-breakpoint
CREATE TABLE `grocery` (
	`grocery_id` int AUTO_INCREMENT NOT NULL,
	`grocery_name` varchar(255),
	CONSTRAINT `grocery_grocery_id` PRIMARY KEY(`grocery_id`)
);
--> statement-breakpoint
CREATE TABLE `point_history` (
	`point_history_id` int AUTO_INCREMENT NOT NULL,
	`point` int,
	`product_id` int,
	`flyer_id` int,
	CONSTRAINT `point_history_point_history_id` PRIMARY KEY(`point_history_id`)
);
--> statement-breakpoint
CREATE TABLE `price_history` (
	`price_history_id` int AUTO_INCREMENT NOT NULL,
	`price` double,
	`unit` varchar(10),
	`price_per_quantity` double,
	`quantity` double,
	`member_price` double,
	`original_price` double,
	`product_id` int,
	`flyer_id` int,
	CONSTRAINT `price_history_price_history_id` PRIMARY KEY(`price_history_id`)
);
--> statement-breakpoint
CREATE TABLE `product` (
	`product_id` int AUTO_INCREMENT NOT NULL,
	`imported_product_code` varchar(255),
	`product_name` varchar(255),
	`brand` varchar(255),
	`package_size` int,
	`package_unit` varchar(10),
	`image_url` varchar(255),
	`grocery_id` int,
	CONSTRAINT `product_product_id` PRIMARY KEY(`product_id`)
);
--> statement-breakpoint
CREATE TABLE `store` (
	`store_id` int AUTO_INCREMENT NOT NULL,
	`imported_store_id` varchar(255),
	`store_name` varchar(255),
	`address` varchar(255),
	`postal_code` varchar(10),
	`grocery_id` int,
	CONSTRAINT `store_store_id` PRIMARY KEY(`store_id`)
);
--> statement-breakpoint
ALTER TABLE `flyer_image` ADD CONSTRAINT `flyer_image_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flyer_store` ADD CONSTRAINT `flyer_store_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `flyer_store` ADD CONSTRAINT `flyer_store_store_id_store_store_id_fk` FOREIGN KEY (`store_id`) REFERENCES `store`(`store_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `point_history` ADD CONSTRAINT `point_history_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_history` ADD CONSTRAINT `price_history_flyer_id_flyer_flyer_id_fk` FOREIGN KEY (`flyer_id`) REFERENCES `flyer`(`flyer_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `price_history` ADD CONSTRAINT `price_history_product_id_product_product_id_fk` FOREIGN KEY (`product_id`) REFERENCES `product`(`product_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `product` ADD CONSTRAINT `product_grocery_id_grocery_grocery_id_fk` FOREIGN KEY (`grocery_id`) REFERENCES `grocery`(`grocery_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `store` ADD CONSTRAINT `store_grocery_id_grocery_grocery_id_fk` FOREIGN KEY (`grocery_id`) REFERENCES `grocery`(`grocery_id`) ON DELETE no action ON UPDATE no action;
*/