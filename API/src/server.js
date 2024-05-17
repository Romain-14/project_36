import "dotenv/config";
import { createRequire } from "module";
import express from "express";
import session from "express-session";
import cors from "cors";

import pool from "./config/db.js";
import router from "./router/index.routes.js";
const require = createRequire(import.meta.url);
const MySQLStore = require("express-mysql-session")(session);

const app = express();

const corsOptions = cors({
	origin: "http://localhost:5173",
	credentials: true,
});

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

app.use(corsOptions);

app.use(newSession);

app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
	console.log("MW", req.session);
    if(req.session.isAdmin){
        console.log("hello admin");
    } else {
        console.log("You are an user");
    }
	next();
});

app.use(router);

app.listen(process.env.LOCAL_PORT, () => {
	console.log("Server is running at http://localhost:" + process.env.LOCAL_PORT);
});
