
module.exports.run = (req, res, con) => {

	if (!checkBody(req.body, res)) return;

	if (req.body.fun == 'login') {
		login(req, res, con);
		return;
	}

	switch (req.body.fun) {
		case 'login': login(req, res, con); break;
		case 'getAllArticles': getAllArticles(req, res, con); break;
		default: res.send({ result: 'err', message: 'fun not exists' });
	}
}

function getAllArticles(req, res, con) {
	let sql = 'SELECT * FROM articles';
	con.query(sql, (err, rows, fields) => {
		if (err) { res.send(err); return; }
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
		if (errTest(err, res)) return;
		if (rows.length != 1) {
			res.send({ result: 'err', message: 'rows != 1' });
		} else {
			
		}
		console.log(rows.length);
	});
}

function errTest(err, res) {
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