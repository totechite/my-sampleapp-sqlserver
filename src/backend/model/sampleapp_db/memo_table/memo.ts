import { PrismaClient, Memo } from '@prisma/client'

export class MemoTable {
    dbConnection: PrismaClient

    constructor(dbConnection: PrismaClient) {
        this.dbConnection = dbConnection
    }

    async post(postData: string): Promise<Memo> {
        const res = this.dbConnection.memo.create({
            data: {
                content: postData
            }
        })
        return res
    }

    async getList(): Promise<Memo[]>{
        const res = await this.dbConnection.memo.findMany()
        return res
    }

}