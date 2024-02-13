/*
  Warnings:

  - You are about to drop the column `cashier` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantities` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `_MenuToTransaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cashier` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cashierId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_MenuToTransaction" DROP CONSTRAINT "_MenuToTransaction_A_fkey";

-- DropForeignKey
ALTER TABLE "_MenuToTransaction" DROP CONSTRAINT "_MenuToTransaction_B_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "cashier",
DROP COLUMN "quantities",
ADD COLUMN     "cashierId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "_MenuToTransaction";

-- DropTable
DROP TABLE "cashier";

-- CreateTable
CREATE TABLE "Cashier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Cashier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TransactionMenu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "transactionId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "TransactionMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "Cashier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionMenu" ADD CONSTRAINT "TransactionMenu_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransactionMenu" ADD CONSTRAINT "TransactionMenu_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
