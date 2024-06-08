import {
  bigint,
  boolean,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";

export const createTable = mysqlTableCreator((name) => `${name}`);

export const watcher = mysqlTable("watcher", {
  watcherID: int("watcher_id").primaryKey().autoincrement(),
  watcherName: varchar("watcher_name", { length: 255 }).notNull(),
  watcherPath: varchar("watcher_path", { length: 4096 }),
  clientID: int("client_id")
    .notNull()
    .references(() => {
      return clients.clientID;
    }),
});

export const files = mysqlTable("files", {
  fileName: varchar("file_name", { length: 255 }).primaryKey(),
  fileSize: bigint("file_size", { mode: "number" }).notNull(),
  isFile: boolean("is_file").notNull(),
  modifyTimestamp: timestamp("modify_timestamp").notNull(),
  createTimestamp: timestamp("create_timestamp").notNull(),
  insertTimestamp: timestamp("insert_timestamp").notNull(),
  watcherID: int("watcher_id")
    .notNull()
    .references(() => {
      return watcher.watcherID;
    }),
});
export const clients = mysqlTable("clients", {
  clientID: int("client_id").primaryKey().autoincrement(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientLastSeen: timestamp("client_last_seen").notNull(),
  clientAuthToken: varchar("client_auth_token", { length: 255 }).notNull(),
  clientPlatform: varchar("client_platform", { length: 255 }).notNull(),
});

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 }).notNull().primaryKey(),
  password: varchar("password", { length: 2048 }).notNull(),
  salt: varchar("salt", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }).defaultNow(),
  image: varchar("image", { length: 255 }),
  username: varchar("name", { length: 255 }),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    refresh_token: varchar("refresh_token", { length: 255 }),
    access_token: varchar("access_token", { length: 255 }),
    expires_at: int("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: varchar("id_token", { length: 2048 }),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
  }),
);

export const sessions = mysqlTable("session", {
  sessionToken: varchar("sessionToken", { length: 255 }).notNull().primaryKey(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});

export const verificationTokens = mysqlTable(
  "verificationToken",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
