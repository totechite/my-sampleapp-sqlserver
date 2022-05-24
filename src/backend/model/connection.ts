import { Connection, Request } from "tedious"
import * as dotenv from "dotenv"
import * as path from "path"
dotenv.config({ path: path.join(__dirname, "../../../.env") });

export function gen_connection() {
    // SQLServerの接続定義を記載する。
    let config = {
        server: process.env.DATABASE_URL,    // IPアドレスもしくはサーバー名
        authentication: {
            type: 'default',
            options: {
                userName: process.env.DB_USER,
                password: process.env.PASSWORD,
            }
        },
        options: {
            encrypt: true, //必要に応じて。
            database: process.env.DB_NAME
        }
    };
    console.debug(config)
    return new Connection(config)
}