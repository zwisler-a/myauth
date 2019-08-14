export interface Realm {
    name: string;
    id: string;
    domains: string;
    secret: string;
    customStyles: string;
    properties: object[];
}
