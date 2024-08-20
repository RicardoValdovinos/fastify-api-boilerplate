import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";
import { GitHub } from "arctic";
import { Lucia } from "lucia";
import { sqlite } from "./database.js";

const adapter: BetterSqlite3Adapter = new BetterSqlite3Adapter(sqlite, {
	user: "user",
	session: "session",
});

const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			secure: process.env.NODE_ENV === "production",
		},
	},
	getUserAttributes: (attributes): { githubId: string; username: string } => {
		return {
			githubId: attributes.github_id,
			username: attributes.username,
		};
	},
});

const github = new GitHub(
	process.env.GITHUB_CLIENT_ID,
	process.env.GITHUB_CLIENT_SECRET
);

export type Auth = {
	lucia: typeof lucia;
	github: typeof github;
};
export const auth: Auth = {
	lucia,
	github,
};

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: {
			github_id: string;
			username: string;
		};
	}
}
