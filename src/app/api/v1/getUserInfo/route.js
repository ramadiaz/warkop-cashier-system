import prisma from "@/app/libs/prisma";

export async function GET(request) {
    // const { email } = request.query;

    // if (!email) {
    //     return Response.json({ status: 400, message: "Email parameter is required" });
    // }

    const userInfo = await prisma.user.findUnique({
        where: {
          email: 'rama@gmail.com'
        }
    });
    console.log(userInfo)

    if (!userInfo) {
        return Response.json({ status: 404, message: "User not found" });
    }

    return Response.json({ status: 200, body: userInfo });
}
