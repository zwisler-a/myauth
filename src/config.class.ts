export class Config {
    orm: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    port: number;
    debug: boolean;
    jwtSecret: string;
}
