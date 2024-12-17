ALTER TABLE `actions` MODIFY COLUMN `fileId` int NOT NULL;--> statement-breakpoint
ALTER TABLE `actions` MODIFY COLUMN `userId` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `actions` ADD CONSTRAINT `actions_fileId_files_id_fk` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `actions` ADD CONSTRAINT `actions_userId_user_id_fk` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE cascade;