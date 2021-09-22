const crypto = require('crypto');

module.exports.run = (req, res, con) => {

	if (!checkBody(req.body, res)) return;

	if (req.body.fun == 'login') {
		login(req, res, con);
		return;
	}

	switch (req.body.fun) {
		case 'login': login(req, res, con); break;
		case 'getAllArticles': getAllArticles(req, res, con); break;
		default: res.send(errJSON('fun not exists'));
	}
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

			if (user.password != row.password) {
				res.send(errJSON('password'));
				return;
			}

			const token = crypto.randomBytes(48).toString('hex');

			let datetime = parseDateJsToSql(new Date());

			console.log(user.nickname, user.password, token, datetime, null);

			let result = {
				nickname: user.nickname,
				password: '',
				token: token,
				lastConnection: datetime,
				lastRequest: null
			}
			res.send(okJSON(result));
		}
	});
}


//
//	PRIVATE FUNCTIONS
//

function parseDateJsToSql(date) {
	return date.toISOString().slice(0, 19).replace('T', ' ');
}

function parseDateSqlToJs(date) {
	let t = date.split(/[- :]/);
	return new Date(Date.UTC(t[0], t[1]-1, t[2], t[3], t[4], t[5]));

}

function okJSON(message) {
	return { result: 'ok', message: message }
}

function errJSON(message) {
	return { result: 'err', message: message }
}

function isError(err, res) {
	if (err) {
		res.send({ result: 'err', message: err });
		return true;
	} else {
		return false;
	}
}

function checkBody(body, res) {

	if (body['fun'] == undefined) {
		res.send({ result: 'err', message: 'fun is not defined' });
		return false;
	}

	if (body['user'] == undefined) {
		res.send({ result: 'err', message: 'user id not defined' });
		return false;
	}

	if (body.user['nickname'] == undefined) {
		res.send({ result: 'err', message: 'nickname is not defined' });
		return false;
	}

	return true;
}