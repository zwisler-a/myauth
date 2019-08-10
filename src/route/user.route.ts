import { Route, Endpoint } from '@zwisler/bridge';
import { JwtService } from '../service/jwt.service';
import { UserService } from '../service/user.service';
import { BridgeError } from '@zwisler/bridge/core/util/bridge.error';

@Route({ basePath: '/user', middleware: [JwtService.authenticate()] })
export class UserRoute {
    constructor(private userService: UserService) {}

    @Endpoint()
    get(id: string) {
        return this.userService.getUser(id);
    }

    @Endpoint()
    getAll() {
        return this.userService.getShortList();
    }

    @Endpoint({ method: 'POST' })
    async update(userId: string, user: any) {
        const updatedUser = await this.userService.updateUser(userId, user.name, user.password, user.admin);
        delete updatedUser.password;
        return updatedUser;
    }

    @Endpoint({ method: 'POST' })
    async create(name: string, password: string, admin: boolean) {
        const updatedUser = await this.userService.create(name, password, admin);
        delete updatedUser.password;
        return updatedUser;
    }

    @Endpoint({ method: 'DELETE' })
    delete(userId) {
        return this.userService.deleteUser(userId);
    }
}
