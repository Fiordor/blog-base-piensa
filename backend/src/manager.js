
module.exports = class Manager {

    req;

    constructor(req, res, connection) {
        this.req = req;
        this.res = res;
        this.con = connection;
    }

    run() {

        if (this.req.body['fun'] == undefined) {
            this.res.send( { res: 'err', message: 'fun is not defined' } );
        }

        switch (this.req.body.fun) {
            case 'getAllArticles': this.getAllArticles(); break;
            default: this.res.send( { res: 'err', message: 'fun not exists' } );
        }
    }

    getAllArticles() {

        this.con.query('SELECT * FROM articles', function (err, rows, fields) {
            if (err) throw err;
            console.log(this.res);
            this.res.send(rows);
        });
    }
}