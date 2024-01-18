import prisma from "@/app/libs/prisma";

export async function POST(request) {
  const { name, price } = await request.json();

  const data = { name, price };

  const createMenu = await prisma.menu.create({ data });

  if (!createMenu) return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}
