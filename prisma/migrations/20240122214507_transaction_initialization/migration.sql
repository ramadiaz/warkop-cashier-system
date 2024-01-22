/*
  Warnings:

  - You are about to drop the `TransactionMenu` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `menuId` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TransactionMenu" DROP CONSTRAINT "TransactionMenu_menuId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionMenu" DROP CONSTRAINT "TransactionMenu_transactionId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "menuId" INTEGER NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL,
ADD COLUMN     "total" INTEGER NOT NULL;

-- DropTable
DROP TABLE "TransactionMenu";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
