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
    createToken(payload: {}) {
        return jwt.sign(payload, this.secret);
    }
}
