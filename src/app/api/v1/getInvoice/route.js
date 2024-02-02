import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const invoice = await prisma.Invoice.findMany()

    return Response.json({status: 200, body: invoice})
}
