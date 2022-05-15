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
exports.MemoTable = void 0;
class MemoTable {
    constructor(dbConnection) {
        this.dbConnection = dbConnection;
    }
    post(postData) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = this.dbConnection.memo.create({
                data: {
                    content: postData
                }
            });
            return res;
        });
    }
    getList() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.dbConnection.memo.findMany();
            return res;
        });
    }
}
exports.MemoTable = MemoTable;
//# sourceMappingURL=memo.js.map