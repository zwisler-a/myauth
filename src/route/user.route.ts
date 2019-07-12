import { Route, Endpoint } from '@zwisler/bridge';

@Route({ basePath: 'user' })
export class UserRoute {
    @Endpoint()
    get() {}

    
}
