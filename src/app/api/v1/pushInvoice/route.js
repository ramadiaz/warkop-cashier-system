import prisma from "@/app/libs/prisma";

export async function POST(request) {
  const { total, cashier } =
    await request.json();

  const invoice = await prisma.Invoice.create({
    data: { cashier, total },
  });

  if (!invoice) {
    return Response.json({ status: 500, isCreated: false });
  }

  return Response.json({ status: 200, isCreated: true });
}
