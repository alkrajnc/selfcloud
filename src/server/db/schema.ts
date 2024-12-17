import {
  bigint,
  boolean,
  mysqlEnum,
  mysqlTableCreator,
  primaryKey,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";
import { int, mysqlTable } from "drizzle-orm/mysql-core";
import type { AdapterAccount } from "@auth/core/adapters";
import { relations } from "drizzle-orm";

export const createTable = mysqlTableCreator((name) => `${name}`);

export const passwords = mysqlTable("passwords", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  username: varchar("username", { length: 255 }).notNull(),
  website: varchar("website", { length: 255 }).notNull(),
  lastAccessed: timestamp("view_timestamp").notNull(),
  password: varchar("password", { length: 2048 }).notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const images = mysqlTable("images", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  size: int("size").notNull(),
  dimensionX: int("dimension_x").notNull(),
  dimensionY: int("dimension_y").notNull(),
  blurhash: varchar("blurhash", { length: 1024 }),
  device: varchar("device", { length: 255 }),
  timestamp: timestamp("timestamp").notNull(),
  location: varchar("location", { length: 512 }),

  ownerId: varchar("ownerId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const secrets = mysqlTable("secrets", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }).notNull(),
  lastAccessed: timestamp("view_timestamp").notNull(),
  value: varchar("value", { length: 4096 }).notNull(),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const files = mysqlTable("files", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  size: bigint("file_size", { mode: "number" }).notNull(),
  isFile: boolean("is_file").notNull(),
  modifyTimestamp: timestamp("modify_timestamp").notNull(),
  createTimestamp: timestamp("create_timestamp").notNull(),
  insertTimestamp: timestamp("insert_timestamp").notNull(),
});

export const fileRelations = relations(files, ({ many }) => ({
  actions: many(actions),
}));

export interface Folder {
  id: number;
  name: string;
  size: number;
  isFile: boolean;
  modifyTimestamp: Date;
  createTimestamp: Date;
  insertTimestamp: Date;
  actions: {
    type: "create" | "update" | "delete";
    user: {
      name: string;
      id: string;
      email: string;
    };
  }[];
}

const actionsEnum = mysqlEnum(["create", "update", "delete"]);

export const actions = mysqlTable("actions", {
  id: int("id").primaryKey().autoincrement(),
  type: actionsEnum.notNull(),
  timestamp: timestamp().notNull(),
  fileId: int("fileId")
    .notNull()
    .references(() => files.id, { onDelete: "cascade", onUpdate: "cascade" }),
  userId: varchar("userId", { length: 255 })
    .notNull()
    .references(() => users.id, { onDelete: "cascade", onUpdate: "cascade" }),
});

export const actionRelation = relations(actions, ({ one }) => ({
  user: one(users, {
    fields: [actions.id],
    references: [users.id],
  }),
  file: one(files, {
    fields: [actions.fileId],
    references: [files.id],
  }),
}));

/* export const files = mysqlTable("files", {
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
}); */
export const clients = mysqlTable("clients", {
  clientID: int("client_id").primaryKey().autoincrement(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientLastSeen: timestamp("client_last_seen").notNull(),
  clientAuthToken: varchar("client_auth_token", { length: 255 }).notNull(),
  clientPlatform: varchar("client_platform", { length: 255 }).notNull(),
});

export const users = mysqlTable("user", {
  id: varchar("id", { length: 255 })
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  emailVerified: timestamp("emailVerified", {
    mode: "date",
    fsp: 3,
  }),
  image: varchar("image", { length: 255 }),
  password: varchar("password", { length: 2048 }).notNull(),
  salt: varchar("salt", { length: 2048 }).notNull(),
});

export const accounts = mysqlTable(
  "account",
  {
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 2048 }).notNull(),
    salt: varchar("salt", { length: 2048 }).notNull(),
    type: varchar("type", { length: 255 }).$type<AdapterAccount>().notNull(),
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
  sessionToken: varchar("sessionToken", { length: 255 }).primaryKey(),
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
  (verificationToken) => ({
    compositePk: primaryKey({
      columns: [verificationToken.identifier, verificationToken.token],
    }),
  }),
);

export const authenticators = mysqlTable(
  "authenticator",
  {
    credentialID: varchar("credentialID", { length: 255 }).notNull().unique(),
    userId: varchar("userId", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
    credentialPublicKey: varchar("credentialPublicKey", {
      length: 255,
    }).notNull(),
    counter: int("counter").notNull(),
    credentialDeviceType: varchar("credentialDeviceType", {
      length: 255,
    }).notNull(),
    credentialBackedUp: boolean("credentialBackedUp").notNull(),
    transports: varchar("transports", { length: 255 }),
  },
  (authenticator) => ({
    compositePk: primaryKey({
      columns: [authenticator.userId, authenticator.credentialID],
    }),
  }),
);

export type SelectUser = typeof users.$inferSelect;
export type SelectAction = typeof actions.$inferSelect;
export type SelectFolder = typeof files.$inferSelect;
export type InsertFolder = typeof files.$inferInsert;
export type Image = typeof images.$inferSelect;
