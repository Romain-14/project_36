import mysql from "mysql2/promise";

const pool = mysql.createPool({
	host: process.env.DB_HOST,
	database: process.env.DB_NAME,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	waitForConnections: true, // Default value is true
	connectionLimit: 10, // Default value is 10
	queueLimit: 0, // Default value is 0
});

pool.getConnection()
	.then((res) => {
		console.log("Connected to the database " + res.config.database);
		pool.releaseConnection(res);
	})
	.catch((err) =>
		console.error("Error while connecting to the database " + err.message)
	);

export default pool;
