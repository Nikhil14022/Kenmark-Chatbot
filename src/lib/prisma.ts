import { PrismaClient } from '@prisma/client'
import 'dotenv/config'

const prismaClientSingleton = () => {
    console.log('PRISMA_INIT: Starting initialization...');
    const url = process.env.DATABASE_URL;
    if (!url) {
        console.error('PRISMA_INIT: DATABASE_URL is missing!');
        throw new Error("DATABASE_URL is not defined in environment variables. Please check your .env file.");
    }
    console.log('PRISMA_INIT: Using URL (masked):', url.substring(0, 20) + '...');
    return new PrismaClient({
        // @ts-ignore - Prisma 5 Datasources configuration
        datasources: {
            db: {
                url: url,
            },
        },
    })
}

declare global {
    var prisma: undefined | ReturnType<typeof prismaClientSingleton>
}

const prisma = globalThis.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma
