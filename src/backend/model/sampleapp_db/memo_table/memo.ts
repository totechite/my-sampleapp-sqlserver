import { Connection, Request, TYPES } from "tedious"
// 型定義インポート
import { PostData } from "../../../../common"

export class MemoTable {
    dbConnection: Connection

    constructor(dbConnection: Connection) {
        this.dbConnection = dbConnection
    }

    async post(postData: string) {
        const connect = this.dbConnection
        connect.on("connect", err => {
            if (err) {
                console.error(err)
            } else {
                exec()
            }
        })

        function exec() {
            const query = `Insert Into memo values( NULL, '${postData}')`,
                request = new Request(query, console.error)
            console.debug(query)
            request.addOutputParameter('id', TYPES.Int)
            request.addOutputParameter('date', TYPES.DateTime)
            request.addOutputParameter('content', TYPES.NVarChar)
            request.on('row', console.debug);
            request.on('requestCompleted', function () {
                connect.close();
                console.debug("connection close")
            });
            connect.execSql(request)
        }
    }

    async getList(): Promise<any[]> {
        const contents = []

        const connect = this.dbConnection
        connect.connect(console.error)

        connect.on("connect", err => {
            if (err) {
                console.error(err)
            } else {
                return exec()
            }
        })

        function exec() {

            const query = `select * from memo`,
                request = new Request(query, console.error)
            console.debug(query)
            request.addOutputParameter('id', TYPES.Int)
            request.addOutputParameter('date', TYPES.DateTime2)
            request.addOutputParameter('content', TYPES.NVarChar)

            request.on('row', columns => {
                console.debug("columns: " + columns)
                const elem = {}
                columns.forEach(column => {
                    elem[column.metadata.colName] = column.value;
                })
                contents.push(elem)
                console.debug(contents)
            })
            request.on('requestCompleted', function () {
                connect.close();
                console.debug("connection close")
                return contents
            });
            connect.execSql(request)
            return contents
        }
        return contents
    }
}

