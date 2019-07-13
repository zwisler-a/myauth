import { Route, Endpoint } from '@zwisler/bridge';
import { JwtService } from '../service/jwt.service';

@Route({ basePath: 'user', middleware: [JwtService.authenticate()] })
export class UserRoute {
    @Endpoint()
    get() {
        throw new Error('Not yet implemented');
    }

    @Endpoint()
    getAll() {
        throw new Error('Not yet implemented');
    }

    @Endpoint({ method: 'DELETE' })
    delete() {
        throw new Error('Not yet implemented');
    }
}
