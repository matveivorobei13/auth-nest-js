import { pgTable, varchar, serial, integer, timestamp, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: varchar("name", {length: 55}).unique().notNull(),
    email: varchar("email", {length: 255}).unique().notNull(),
    password: varchar("password", {length: 255}).notNull(),
    created_at: timestamp("created_at", {withTimezone: false}).notNull().defaultNow()
})

export const tokens = pgTable("tokens", {
    id: serial("id").primaryKey(),
    token: text("token").notNull(),
    user_id: integer("user_id").references(() => users.id).notNull(),
    created_at: timestamp("created_at", {withTimezone: false}).notNull().defaultNow(),
    expires_at: timestamp("expires_at", {withTimezone: false}).notNull()
})

export const notes = pgTable("notes", {
    id: serial("id").primaryKey(),
    user_id: integer("user_id").references(() => users.id).notNull(),
    title: varchar("title", {length: 55}).notNull(),
    content: text("content").notNull()
})