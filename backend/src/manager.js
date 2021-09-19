
module.exports.run = (req, res, con) => {

    if (req.body['fun'] == undefined) {
        res.send( { res: 'err', message: 'fun is not defined' } );
    }

    switch (req.body.fun) {
        case 'getAllArticles': getAllArticles(req, res, con); break;
        default: res.send( { res: 'err', message: 'fun not exists' } );
    }
}

function getAllArticles(req, res, con) {
    con.query('SELECT * FROM articles', (err, rows, fields) => {
        if (err) { res.send(err); return; }
        res.send(rows);
    });
}