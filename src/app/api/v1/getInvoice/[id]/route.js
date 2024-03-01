import prisma from "@/app/libs/prisma";

export async function GET(request, { params: { id } }) {
  const invoiceId = parseInt(id, 10);

  if (!id) {
    return Response.json({
      status: 400,
      message: "ID parameter is required",
    });
  }

  const transactionInfo = await prisma.Transaction.findFirst({
    where: {
      id: invoiceId,
    },
    include: {
      menus: true,
      cashier: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!transactionInfo) {
    return Response.json({ status: 404, message: "Transaction not found" });
  }

  return Response.json({ status: 200, body: transactionInfo });
}
