import * as mysql from 'mysql';

export default class Table<T> {

    constructor(private pool: mysql.Pool, private tableName: string, private rowTypes?: { [K in keyof T]: mysql.Types }) {
        
    }

    all(orderBy?: string): Promise<T[]> {

        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM ${this.tableName} ${orderBy ? 'ORDER BY ' + orderBy : ''}`, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });
    }

    one(id: number): Promise<T> {

        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, id, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results[0]);
                }
            });
        });
    }

    insert(row: T): Promise<{ id: number}> {

        return new Promise((resolve, reject) => {
            this.pool.query(`insert into ${this.tableName} (${Object.keys(row).map((v) => {
                    return `${v}`;
                })}) VALUES(${Object.keys(row).map((v) => {
                    return `?`;
                })});`,
            this.rowToValueArray(row),
            (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve({id: results.insertId});
                }
            });
        });
    }

    update(id: number, row: T): Promise<number> {

        let vals = this.rowToValueArray(row);
        vals.push(id);

        return new Promise((resolve, reject) => {
            this.pool.query(`UPDATE ${this.tableName} SET ${Object.keys(row).map((v) => {
                return `${v} = ?`;
            })} WHERE id = ?`,
            vals, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results.affectedRows);
                }
            })
        });
    }

    delete(id: number): Promise<number> {

        return new Promise((resolve, reject) => {
            this.pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, id, (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results.affectedRows);
                }
            });
        });
    }

    find(row: T) : Promise<T[]> {

        return new Promise((resolve, reject) => {
            this.pool.query(`SELECT * FROM ${this.tableName} WHERE ${Object.keys(row).map((v) => {
                return `${v} = ?`;
            })}`,
            this.rowToValueArray(row),
            (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results);
                }
            });
        });
    }

    findOne(row: T) : Promise<T> {

        return new Promise((resolve, reject) => {
            let sql = `SELECT * FROM ${this.tableName} WHERE ${Object.keys(row).map((v) => {
                return `${v} = ?`;
            }).join(` and `)} LIMIT 1;`;
            console.log(sql);
            this.pool.query(sql,
            this.rowToValueArray(row),
            (err, results) => {
                if(err) {
                    return reject(err);
                } else {
                    return resolve(results[0]);
                }
            });
        });
    }

    private rowToValueArray(row: any): any[] {
        let vals: any[] = [];
        Object.keys(row).map((k) => {
            vals.push(row[k]);
        });
        return vals;
    }
}
