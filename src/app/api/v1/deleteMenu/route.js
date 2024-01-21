import prisma from "@/app/libs/prisma";

export async function DELETE(request) {
    const menuId = await request.json()

    const deleteMenu = await prisma.Menu.delete({
        where: {
            id: menuId,
        }
    })

    if(!deleteMenu) return Response.json({response: 500})
    else return Response.json({response: 200})
}