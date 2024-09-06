import prisma from "@/lib/prisma";

export async function GET(req) {
  return Response.json(
    await prisma.personal.findFirst({
      where: {
        id: 54321,
      },
    })
  );
}
