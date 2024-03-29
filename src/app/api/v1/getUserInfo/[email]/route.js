import prisma from "@/app/libs/prisma";

export async function GET(request, { params: e }) {
  const { email } = e;

  if (!email) {
    return Response.json({
      status: 400,
      message: "Email parameter is required",
    });
  }

  const userInfo = await prisma.user.findUnique({
    where: {
      email: email.toString(),
    },
  });

  if (!userInfo) {
    const userInfo2 = await prisma.user.findUnique({
      where: {
        email: email.toString(),
      },
    });
    if (!userInfo2) {
      return Response.json({ status: 404, message: "User not found" });
    }

    return Response.json({ status: 200, body: userInfo2 });
  }

  return Response.json({ status: 200, body: userInfo });
}
