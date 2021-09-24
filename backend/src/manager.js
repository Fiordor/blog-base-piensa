const crypto = require('crypto');
const HOURS_KEEP = 5;

module.exports.run = (req, res, con) => {

	if (!checkBody(req.body, res)) return;

	if (req.body.fun == 'login') { login(req, res, con); return; }

	let sql = `SELECT * FROM users u WHERE u.nickname = '${req.body.user.nickname}';`;
	con.query(sql, (err, rows, fields) => {
		if (isError(err, res)) return;
		if (isErrorUser(req.body.user, rows, res, con)) return;
		switch (req.body.fun) {
			case 'getArticlesProcess': getArticlesProcess(req, res, con); break;
			case 'getArticlesDone': getArticlesDone(req, res, con); break;
			case 'getArticlesPost': getArticlesPost(req, res, con); break;
			case 'getArticlesDelete': getArticlesDelete(req, res, con); break;
			default: res.send(errJSON('fun not exists'));
		}
	});
}

//
//	PATH FUNCTIONS
//

function getAllArticles(req, res, con) {
	let sql = 'SELECT * FROM articles';
	con.query(sql, (err, rows, fields) => {
		if (isError(err, res)) return;
		res.send(rows);
	});
}

/**
 * Login usando el nickname y el password
 * req.body = { fun: string, user: User }
 */
function login(req, res, con) {

	let sql = `SELECT * FROM users u WHERE u.nickname = '${req.body.user.nickname}';`;
	con.query(sql, (err, rows, fields) => {
		if (isError(err, res)) return;
		if (rows.length != 1) {

			res.send(errJSON('rows.length != 1'));

		} else {

			let user = req.body.user;
			let row = rows[0];

			if (user.password != row.password) { res.send(errJSON('password')); return; }

			const token = crypto.randomBytes(48).toString('hex');
			let lastConnection = new Date();
			let keepConnection = addHours(lastConnection, HOURS_KEEP);

			lastConnection = parseDateJsToSql(lastConnection);
			keepConnection = parseDateJsToSql(keepConnection);

			let result = { nickname: user.nickname, password: '', token: token }
			let sql1 =
				`UPDATE users 
				SET token='${token}', lastConnection='${lastConnection}', keepConnection='${keepConnection}' 
				WHERE nickname='${user.nickname}'`;

			con.query(sql1, (err, rows, fields) => {
				if (!isError(err, res)) { res.send(okJSON(result)); }
			});
		}
	});
}

/**
 * Devuelve los artículos que están aún en proceso.
 */
function getArticlesProcess(req, res, con) {
	let sql =
		`SELECT *
		FROM articles a
		WHERE a.done = 0 AND a.\`delete\` = 0 AND ISNULL(a.datePost);`;
	let start = Date.now();
	con.query(sql, (err, rows, fields) => {
		if (isError(err, res)) return;

		rows.forEach(row => { row.content = null; });

		res.send(okJSON(rows));
	});
}
/**
 * Devuelve los artículos que están marcados como 'terminado'.
 */
function getArticlesDone(req, res, con) {  }
/**
 * Devuelve los artículos que están publicados o con fecha de publicación.
 */
function getArticlesPost(req, res, con) {  }
/**
 * Devuelve los artículos que están eliminados
 */
function getArticlesDelete(req, res, con) {  }


//
// RESULTS
//

function okJSON(message) { return { result: 'ok', message: message }; }

function errJSON(message) { return { result: 'err', message: message }; }

//
//	PRIVATE FUNCTIONS
//

function addHours(date, n) {
	let d = new Date(date.toString());
	return d = new Date(d.setHours(date.getHours() + n));
}

function parseDateJsToSql(date) {
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

function isError(err, res) {
	if (err) {
		res.send(errJSON(err));
		return true;
	} else {
		return false;
	}
}

function isErrorUser(user, rows, res, con) {

	if (rows.length != 1) {
		res.send(errJSON('rows.length != 1'));
		return true;
	}

	let row = rows[0];

	if (row.keepConnection - Date.now() < 0) {
		res.send(errJSON('token expired'));
		return true;
	}

	if (user.token != row.token) {
		res.send(errJSON('wrong token'));
		return true;
	}

	let nowDate = new Date();
	let lastRequest = parseDateJsToSql(nowDate);
	let keepConnection = parseDateJsToSql(addHours(nowDate, HOURS_KEEP));

	let sql =
		`UPDATE users 
		SET lastRequest='${lastRequest}', keepConnection='${keepConnection}' 
		WHERE nickname='${user.nickname}'`;

	con.query(sql, (err, rows, fields) => { });

	return false;
}

function checkBody(body, res) {

	if (body['fun'] == undefined) {
		res.send(errJSON('fun is not defined'));
		return false;
	}

	if (body['user'] == undefined) {
		res.send(errJSON('user id not defined'));
		return false;
	}

	if (body.user['nickname'] == undefined) {
		res.send('nickname is not defined');
		return false;
	}

	return true;
}