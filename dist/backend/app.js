"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// モジュールインポート
const express = require("express");
const connection_1 = require("./model/connection");
const memo_1 = require("./model/sampleapp_db/memo_table/memo");
const static_params_1 = require("./static_params");
const DBConn = (0, connection_1.gen_connection)();
const app = express();
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
app.get('/api/memo/list', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/api/memo/list recieved');
    const MemoOps = new memo_1.MemoTable(DBConn);
    const queryResult = MemoOps.getList().then(values => {
        console.log('/api/memo/list success');
        res.status(200).send(JSON.stringify({ list: values }));
    }).catch(err => {
        console.log('/api/memo/list fail');
        console.error(err);
        res.status(400);
    });
    yield queryResult;
}));
app.post('/api/memo/post', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('/api/memo/post recieved');
    const MemoOps = new memo_1.MemoTable(DBConn);
    const postData = req.body.content;
    console.log(`post data: ${postData}`);
    const queryResult = MemoOps.post(postData).then(_ => {
        console.log('/api/memo/post success');
        res.status(200);
    }).catch(err => {
        console.log('/api/memo/post fail');
        console.error(err);
        res.status(400);
    });
    yield queryResult;
}));
app.listen(static_params_1.SERVER_PORT, () => {
    console.log("Start on port:" + static_params_1.SERVER_PORT.toString());
});
//# sourceMappingURL=app.js.map