import prisma from "@/app/libs/prisma";

export async function GET(request) {
    let menu
    
    try {
        menu = await prisma.Menu.findMany()
    }catch(err){
        console.log(err)
    }

    return Response.json({status: 200, body: menu})
}
