import { Service } from '@zwisler/bridge';
import { Repository } from 'typeorm';

import { User } from '../model/user.model';
import { OrmService } from './orm.service';

@Service()
export class UserService {
    userRepo: Repository<User>;

    constructor(ormService: OrmService) {
        this.userRepo = ormService.connection.getRepository(User);
    }

    getUser(userId: string): Promise<User> {
        return this.userRepo.findOne(userId);
    }

    async userExists(name: string): Promise<boolean> {
        return (await this.userRepo.find({ name: name })).length !== 0;
    }

    getUserByName(name: string) {
        return this.userRepo.findOne({ where: { name } });
    }

    create(username: string, password: string) {
        const newUser = new User(username, password);
        return this.userRepo.save(newUser);
    }
}
