import { PrismaClient } from '@prisma/client'

export function gen_connection(): PrismaClient {
    return new PrismaClient()
}