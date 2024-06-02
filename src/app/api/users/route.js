import prisma from "@/lib/prisma";

export async function GET(req) {
  return Response.json(await prisma.users.findMany());
}
