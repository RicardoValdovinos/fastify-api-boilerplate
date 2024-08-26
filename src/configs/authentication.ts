import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { Lucia } from "lucia";
import { sqlite } from "./database.js";

const adapter: BetterSqlite3Adapter = new BetterSqlite3Adapter(sqlite, {
	user: "user",
	session: "session",
});

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}
