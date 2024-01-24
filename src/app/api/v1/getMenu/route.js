import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const menu = await prisma.Menu.findMany()

    return Response.json({status: 200, body: menu})
}
