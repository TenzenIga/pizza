import { Pool, QueryFunction } from 'mysql'
export default interface PromisifiedPool extends Omit<Pool, 'query'> {
    insertId?: string;
    query: QueryFunction | Function;
}