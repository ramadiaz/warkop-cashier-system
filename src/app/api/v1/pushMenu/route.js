import prisma from "@/app/libs/prisma";

export async function POST(request) {
  const { id, name, price, type, stock } = await request.json();

  const data = { id, name, type, price, stock};

  const createMenu = await prisma.Menu.create({ data });

  if (!createMenu) return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}
