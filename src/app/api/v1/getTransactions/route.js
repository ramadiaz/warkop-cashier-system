import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const transactions = await prisma.Transaction.findMany()

    return Response.json({status: 200, body: transactions})
}
