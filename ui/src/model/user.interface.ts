export class User {
    constructor(
        public id: string = '',
        public name: string = '',
        public password: string = '',
        public admin: boolean = false
    ) {}
}
