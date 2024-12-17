CREATE TABLE `images` (
	`id` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`size` int NOT NULL,
	`dimension_x` int NOT NULL,
	`dimension_y` int NOT NULL,
	`timestamp` timestamp NOT NULL,
	`location` varchar(512),
	`ownerId` varchar(255) NOT NULL,
	CONSTRAINT `images_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `images` ADD CONSTRAINT `images_ownerId_user_id_fk` FOREIGN KEY (`ownerId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;