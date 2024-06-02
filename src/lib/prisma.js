import { PrismaClient } from "@prisma/client";

/**
 * @type {PrismaClient}
 */
const prisma = globalThis.prisma ?? new PrismaClient();
export default prisma;

globalThis.prisma = prisma;
