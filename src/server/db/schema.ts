import {
  bigint,
  boolean,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `${name}`);

export const files = createTable("file", {
  name: varchar("file_name", { length: 255 }).notNull(),
  filePath: varchar("file_path", { length: 4096 }).notNull(),
  createdAt: timestamp("file_create_timestamp").notNull(),
  modifiedAt: timestamp("file_modify_timestamp").notNull(),
  size: bigint("file_size", { mode: "number" }).notNull(),
  isFile: boolean("is_file").notNull(),
  isFolder: boolean("is_folder").notNull(),
  extensions: varchar("file_extension", { length: 8 }).notNull(),
  folderId: bigint("folder_id", { mode: "number" }).notNull(),
});

export const folders = createTable("folders", {
  name: varchar("folder_name", { length: 255 }).notNull(),
  filePath: varchar("folder_path", { length: 4096 }).notNull(),
  isScanned: boolean("is_scanned").notNull(),
  id: bigint("folder_id", { mode: "number" }).notNull(),
});
