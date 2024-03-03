import prisma from "@/app/libs/prisma";

export const revalidate = 1

export async function GET(request) {

    const transactions = await prisma.TransactionMenu.findMany()

    return Response.json({status: 200, body: transactions})
}
