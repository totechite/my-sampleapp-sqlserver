"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gen_connection = void 0;
const client_1 = require("@prisma/client");
function gen_connection() {
    return new client_1.PrismaClient();
}
exports.gen_connection = gen_connection;
//# sourceMappingURL=connection.js.map