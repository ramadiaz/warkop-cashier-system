import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const invoice = await prisma.Transaction.findMany(
        {
            orderBy: {
                id: 'desc',
            },
            take: 1,
            select: {
                id: true,
            }
        }
    )

    return Response.json({status: 200, body: invoice})
}
