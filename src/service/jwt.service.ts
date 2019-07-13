import { Service } from '@zwisler/bridge';

const jwt = require('jsonwebtoken');

@Service()
export class JwtService {
    static secret: string;

    createToken(payload: {}, secret?: string) {
        return jwt.sign(payload, secret || JwtService.secret);
    }

    verify(token: string, secret?: string) {
        return jwt.verify(token, secret || JwtService.secret);
    }

    static authenticate() {
        return (req, res, next) => {
            const authHeader = req.header('x-auth');
            if (!authHeader) return res.status(401).send('No x-auth token found!');
            try {
                const tokenPayload = jwt.verify(authHeader, JwtService.secret);
                if (tokenPayload.admin) {
                    next();
                } else {
                    res.status(403).send();
                }
            } catch (e) {
                return res.status(401).send('Invalid token!');
            }
        };
    }
}
