import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const transactions = await prisma.Transaction.findMany(
        {
            include: {
                menus: true,
                cashier: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        }
    )

    return Response.json({status: 200, body: transactions})
}
