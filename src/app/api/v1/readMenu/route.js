import prisma from "@/app/libs/prisma";

export async function GET(request) {

    const menu = await prisma.menu.findMany()

    return Response.json({status: 200, body: menu})
}
