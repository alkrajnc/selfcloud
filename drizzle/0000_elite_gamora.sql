CREATE TABLE `account` (
	`userId` varchar(255) NOT NULL,
	`type` varchar(255) NOT NULL,
	`provider` varchar(255) NOT NULL,
	`providerAccountId` varchar(255) NOT NULL,
	`refresh_token` varchar(255),
	`access_token` varchar(255),
	`expires_at` int,
	`token_type` varchar(255),
	`scope` varchar(255),
	`id_token` varchar(2048),
	`session_state` varchar(255),
	CONSTRAINT `account_provider_providerAccountId_pk` PRIMARY KEY(`provider`,`providerAccountId`)
);
--> statement-breakpoint
CREATE TABLE `clients` (
	`client_id` int AUTO_INCREMENT NOT NULL,
	`client_name` varchar(255) NOT NULL,
	`client_last_seen` timestamp NOT NULL,
	`client_auth_token` varchar(255) NOT NULL,
	`client_platform` varchar(255) NOT NULL,
	CONSTRAINT `clients_client_id` PRIMARY KEY(`client_id`)
);
--> statement-breakpoint
CREATE TABLE `files` (
	`file_name` varchar(255) NOT NULL,
	`file_size` bigint NOT NULL,
	`is_file` boolean NOT NULL,
	`modify_timestamp` timestamp NOT NULL,
	`create_timestamp` timestamp NOT NULL,
	`insert_timestamp` timestamp NOT NULL,
	`watcher_id` int NOT NULL,
	CONSTRAINT `files_file_name` PRIMARY KEY(`file_name`)
);
--> statement-breakpoint
CREATE TABLE `session` (
	`sessionToken` varchar(255) NOT NULL,
	`userId` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `session_sessionToken` PRIMARY KEY(`sessionToken`)
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` varchar(255) NOT NULL,
	`password` varchar(2048) NOT NULL,
	`salt` varchar(255) NOT NULL,
	`email` varchar(255) NOT NULL,
	`emailVerified` timestamp(3) DEFAULT (now()),
	`image` varchar(255),
	`name` varchar(255),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `verificationToken` (
	`identifier` varchar(255) NOT NULL,
	`token` varchar(255) NOT NULL,
	`expires` timestamp NOT NULL,
	CONSTRAINT `verificationToken_identifier_token_pk` PRIMARY KEY(`identifier`,`token`)
);
--> statement-breakpoint
CREATE TABLE `watcher` (
	`watcher_id` int AUTO_INCREMENT NOT NULL,
	`watcher_name` varchar(255) NOT NULL,
	`watcher_path` varchar(4096),
	`client_id` int NOT NULL,
	CONSTRAINT `watcher_watcher_id` PRIMARY KEY(`watcher_id`)
);
--> statement-breakpoint
ALTER TABLE `account` ADD CONSTRAINT `account_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `files` ADD CONSTRAINT `files_watcher_id_watcher_watcher_id_fk` FOREIGN KEY (`watcher_id`) REFERENCES `watcher`(`watcher_id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `watcher` ADD CONSTRAINT `watcher_client_id_clients_client_id_fk` FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`) ON DELETE no action ON UPDATE no action;