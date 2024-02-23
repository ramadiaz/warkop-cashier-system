import prisma from "@/app/libs/prisma";

export async function GET(request) {
    let transactions
    try{
        transactions = await prisma.cashier.findMany()
    }catch(err) {
        console.log(err)
    }

    return Response.json({status: 200, body: transactions})
}
