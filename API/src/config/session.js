import { createRequire } from "module";
import session from "express-session";
import pool from "./db.js";
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

const sessionStore = new MySQLStore(
	{
		clearExpired: true,
		checkExpirationInterval: 900000, // 15 minutes
		expiration: 3600000, // 1 heure
	},
	pool
);

const newSession = session({
	name: "session_id",
	secret: process.env.SECRET_SESSION,
	resave: false,
	saveUninitialized: false,
	store: sessionStore,
	cookie: {
		secure: false,
		httpOnly: true,
		sameSite: "lax",
		maxAge: 3600000,
		domain: "localhost",
	},
	rolling: true,
});

export default newSession;