// モジュールインポート
import * as express from "express"
import { gen_connection } from "./model/connection"
import { MemoTable } from "./model/sampleapp_db/memo_table/memo"
import { SERVER_PORT } from "./static_params"


// 型定義インポート
import { PostData } from "../common"

const app = express()
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Render
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

import { Connection, Request, TYPES } from "tedious"
// API
app.get('/api/memo/list', async (req, res) => {
    const connect = gen_connection()
    console.log('/api/memo/list recieved')

    connect.connect(console.error)

    connect.on("connect", err => {
        if (err) {
            console.error(err)
        } else {
            exec()
        }
    })

    function exec() {
        const contents = []

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
            return res.status(200).send(JSON.stringify({ list: contents }))
        });
        connect.execSql(request)
    }
});

app.post('/api/memo/post', async (req, res) => {
    console.log('/api/memo/post recieved')
    const connect = gen_connection()

    const postData = req.body.content
    console.log(`post data: ${postData}`)

    connect.connect(console.error)
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
        request.on('row', columns => {
            columns.forEach(column => {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });
        request.on('requestCompleted', function () {
            connect.close();
            console.debug("connection close")
            return res.status(200)
        });
        connect.execSql(request)
    }

    // const MemoOps = new MemoTable(DBConn)
    // const postData = req.body.content
    // console.log(`post data: ${postData}`)

    // const queryResult = MemoOps.post(postData).then(_ => {
    //     console.log('/api/memo/post success');
    //     res.status(200)
    // }
    // ).catch(err => {
    //     console.log('/api/memo/post fail');
    //     console.error(err);
    //     res.status(400)
    // })
    // await queryResult
});

app.listen(SERVER_PORT, () => {
    console.log("Start on port:" + SERVER_PORT.toString())
})
