// モジュールインポート
import * as express from "express"
import { gen_connection } from "./model/connection"
import { MemoTable } from "./model/sampleapp_db/memo_table/memo"
import { SERVER_PORT } from "./static_params"

// 型定義インポート
import { PostData } from "../common"

const DBConn = gen_connection()

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


// API
app.get('/api/memo/list', async (req, res) => {
    console.log('/api/memo/list recieved')

    const MemoOps = new MemoTable(DBConn)
    const queryResult = MemoOps.getList().then(values => {
        console.log('/api/memo/list success');
        res.status(200).send(JSON.stringify({ list: values }))
    }
    ).catch(err => {
        console.log('/api/memo/list fail');
        console.error(err);
        res.status(400)
    }
    )
    await queryResult
});

app.post('/api/memo/post', async (req, res) => {
    console.log('/api/memo/post recieved')

    const MemoOps = new MemoTable(DBConn)
    const postData = req.body.content
    console.log(`post data: ${postData}`)

    const queryResult = MemoOps.post(postData).then(_ => {
        console.log('/api/memo/post success');
        res.status(200)
    }
    ).catch(err => {
        console.log('/api/memo/post fail');
        console.error(err);
        res.status(400)
    })
    await queryResult
});

app.listen(SERVER_PORT, () => {
    console.log("Start on port:" + SERVER_PORT.toString())
})
