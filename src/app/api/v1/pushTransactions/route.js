import prisma from "@/app/libs/prisma";

export async function POST(request) {
  const { menuId, quantity, total } = await request.json();

  const menuUpdate = await prisma.Menu.update({
    where: { id: menuId },
    data: {
      stock: {
        decrement: quantity,
      },
    },
  });

  if (!menuUpdate) {
    return Response.json({ status: 500, isCreated: false });
  }

  const transaction = await prisma.Transaction.create({
    data: { menuId, quantity, total },
  });

  if (!transaction) {
    await prisma.Menu.update({
      where: { id: menuId },
      data: {
        stock: {
          increment: quantity,
        },
      },
    });
    return Response.json({ status: 500, isCreated: false });
  }

  return Response.json({ status: 200, isCreated: true });
}
