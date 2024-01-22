import prisma from "@/app/libs/prisma";

export async function POST(request) {
  const { menuId, quantity, total } = await request.json();

  const data = { menuId, quantity, total };

  const pushTransaction = await prisma.Transaction.create({ data });

  if (!pushTransaction) return Response.json({ status: 500, isCreated: false });
  else return Response.json({ status: 200, isCreated: true });
}
