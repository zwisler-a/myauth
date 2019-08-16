import { Service } from '@zwisler/bridge';
import { OrmService } from './orm.service';
import { LogEntry } from '../model/log.model';
import { Repository } from 'typeorm';

@Service()
export class LogService {
    logRepo: Repository<LogEntry>;
    constructor(ormService: OrmService) {
        this.logRepo = ormService.connection.getRepository(LogEntry);
    }

    log(message: string) {
        const createdLog = new LogEntry(message);
        this.logRepo.save(createdLog);
    }
}
