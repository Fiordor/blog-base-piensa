
module.exports.run = (req, res, con) => {

	if (req.body['fun'] == undefined) {
		res.send({ res: 'err', message: 'fun is not defined' });
	}

	switch (req.body.fun) {
		case 'login': login(req, res, con); break;
		case 'getAllArticles': getAllArticles(req, res, con); break;
		default: res.send({ res: 'err', message: 'fun not exists' });
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

	if (req.body['user'] == undefined) {
		res.send({ res: 'err', message: 'user not exists' });
		return;
	}

	let reqUser = req.body.user;
	if (reqUser['nickname'] == undefined) {
		res.send({ res: 'err', message: 'nickname not exists' });
		return;
	}

	let sql = `SELECT * FROM users u WHERE u.nickname = '${reqUser.nickname}';`;
	con.query(sql, (err, rows, fields) => {

	});
}