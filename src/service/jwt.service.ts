import { Service } from '@zwisler/bridge';
import { Config } from '../config.class';
const jwt = require('jsonwebtoken');
const fs = require('fs');

@Service()
export class JwtService {
    private secret: string;

    constructor(config: Config) {
        this.secret = fs.readFileSync(config.jwtSecret);
    }
    createToken(payload: {}, secret?: string) {
        return jwt.sign(payload, secret || this.secret);
    }

    verify(token: string, secret?: string) {
        return jwt.verify(token, secret || this.secret);
    }
}
