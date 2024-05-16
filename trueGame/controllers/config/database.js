const mysqlConfig = {
	host: '',
	user: 'root',
	password: '',
	database: 'truegame',
	waitForConnection: true,
	connectionLimit: 15000,
	queueLimit: 10000,
};

module.exports = { mysqlConfig };
