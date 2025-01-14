import { bigint, date, pgEnum, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const STATUS_ENUM = pgEnum('status', ['PENDING', 'APPROVED', 'REJECTED']);
export const ROLE_ENUM = pgEnum('role', ['ADMIN', 'USER']);
export const BORROW_ENUM = pgEnum('borrow_status', ['BORROWED', 'RETURNED']);

export const usersTable = pgTable("users", {
  id: uuid("id").notNull().primaryKey().defaultRandom().unique(),
  fullname: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  universityId: bigint("university_id", { mode: "number" }).notNull().unique(),
  universityCard: text("university_card").notNull(),
  password: text("password").notNull(),
  status: STATUS_ENUM("status").notNull().default("PENDING"),
  role: ROLE_ENUM("role").notNull().default("USER"),
  lastActivityDate: date("last_activity_date").notNull().defaultNow(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});


