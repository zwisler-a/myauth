import { Server } from '@zwisler/bridge';

import { InitServer } from './init-server';
import { AuthRoute } from './route/auth.route';
import { UserRoute } from './route/user.route';
import { AuthService } from './service/auth.service';
import { OrmService } from './service/orm.service';
import { UserService } from './service/user.service';
import { RealmService } from './service/realm.service';
import { RealmRoute } from './route/realm.route';
import { Config } from './config.class';
import { JwtService } from './service/jwt.service';
import { PropertyService } from './service/property.service';
import { PropertyRoute } from './route/property.route';

const path = require('path');
const bodyParser = require('body-parser');
const config: Config = require('./config.json');

@Server({
    debug: config.debug,
    port: config.port,
    resolve: InitServer,
    middleware: [bodyParser.urlencoded({ extended: false })],
    staticPath: path.join(__dirname, 'ui/'),
    providers: [OrmService, AuthService, UserService, RealmService, PropertyService, JwtService, { provide: Config, useValue: config }],
    routes: [AuthRoute, UserRoute, RealmRoute, PropertyRoute]
})
export class AuthServer {}
