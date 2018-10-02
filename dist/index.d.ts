import * as mysql from 'mysql';
export default class Table<T> {
    private pool;
    private tableName;
    private rowTypes?;
    constructor(pool: mysql.Pool, tableName: string, rowTypes?: { [K in keyof T]: mysql.Types; } | undefined);
    all(orderBy?: string): Promise<T[]>;
    one(id: number): Promise<T>;
    insert(row: T): Promise<{
        id: number;
    }>;
    update(id: number, row: T): Promise<number>;
    delete(id: number): Promise<number>;
    find(row: T): Promise<T[]>;
    findOne(row: T): Promise<T>;
    private rowToValueArray;
}
//# sourceMappingURL=index.d.ts.map