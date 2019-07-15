import { Service } from '@zwisler/bridge';
import { Repository } from 'typeorm';

import { User } from '../model/user.model';
import { OrmService } from './orm.service';

const bcrypt = require('bcryptjs');
@Service()
export class UserService {
    userRepo: Repository<User>;

    constructor(ormService: OrmService) {
        this.userRepo = ormService.connection.getRepository(User);
    }

    getUser(userId: string): Promise<User> {
        return this.userRepo.findOne(userId);
    }

    async updateUser(userId: string, name?: string, password?: string, admin?: boolean) {
        const user = await this.userRepo.findOneOrFail(userId);
        if (name) user.name = name;
        if (password && password != '') user.password = await bcrypt.hash(password, 8);
        if (admin !== undefined) user.admin = admin;
        return await this.userRepo.save(user);
    }

    getShortList(): Promise<{ name: string; id: string }[]> {
        return this.userRepo
            .createQueryBuilder()
            .select(['name', 'id'])
            .getRawMany();
    }

    async userExists(name: string): Promise<boolean> {
        return (await this.userRepo.find({ name: name })).length !== 0;
    }

    deleteUser(userId: any): any {
        return this.userRepo
            .createQueryBuilder()
            .delete()
            .where('id = :userId', { userId })
            .execute();
    }

    getUserByName(name: string) {
        return this.userRepo.findOne({ where: { name } });
    }

    async create(username: string, password: string, admin?: boolean) {
        password = await bcrypt.hash(password, 8);
        const newUser = new User(username, password);
        newUser.admin = admin || false;
        return this.userRepo.save(newUser);
    }
}
