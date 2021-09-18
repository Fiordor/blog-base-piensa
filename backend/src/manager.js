
module.exports = class Manager {

    constructor(req, res, connection) {
        this.req = req;
        this.res = res;
        this.con = connection;
    }

    run() {
        
        if (this.req.body['fun'] == undefined) {
            return { res: 'err', message: 'fun is not defined' };
        }
    }
}