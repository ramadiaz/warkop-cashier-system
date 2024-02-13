import prisma from "@/app/libs/prisma";

export async function POST(req) {
  try {
    const { cashierId, totalAmount, cash, change, menus } = await req.json();
    
    if (!cashierId || !totalAmount || !cash || !menus) {
      throw new Error("Missing required parameters");
    }

    const cashInt = parseInt(cash)

    console.log(menus);

    const transaction = await prisma.transaction.create({
      data: {
        cashier: { connect: { id: cashierId } },
        totalAmount,
        cash: cashInt,
        change,
        menus: {
          create: menus.map((menu) => ({
            menu: { connect: { id: menu.menuId } },
            name: menu.name,
            price: menu.price,
            amount: menu.amount,
            quantity: menu.quantity,
          })),
        },
      },
      include: { menus: true },
    });

    return Response.json({ success: true, transaction });
  } catch (error) {
    console.error("Error processing transaction:", error);
    return Response.json({
      error: "Internal Server Error",
      details: error.message,
    });
  }
}
