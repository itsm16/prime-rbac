import { pgTable } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

const usersTable = pgTable("users", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({length: 255}).notNull(),
    email: t.varchar({length: 255}).notNull().unique(),
    password: t.text().notNull(),
    role: t.varchar({length: 50}).default("user").notNull(),
})

const jobsTable = pgTable("job", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    role: t.varchar({length: 100}).notNull(),
    company: t.varchar({length: 100}).notNull(),
    location: t.varchar({length: 80}).notNull(),
    description: t.text().notNull()
})

const applicationsTable = pgTable("applications", {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    user_id: t.integer()
        .references(() => usersTable.id)
        .notNull(),
    job_id: t.integer()
        .references(() => jobsTable.id, { onDelete: "cascade" })
        .notNull(),
    resume_url: t.text().notNull()
});

export {
    usersTable,
    jobsTable,
    applicationsTable
}