export class User {

    nickname: string;
    password: string;
    token: string;
    lastConnection: Date;
    lastRequest: Date;

    constructor() {
        this.nickname = '';
        this.password = '';
        this.token = '';
        this.lastConnection = new Date(0);
        this.lastRequest = new Date(0);
    }
}
