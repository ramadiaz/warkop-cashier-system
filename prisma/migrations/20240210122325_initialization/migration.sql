/*
  Warnings:

  - You are about to drop the column `menuId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `quantity` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the column `transactionId` on the `Transaction` table. All the data in the column will be lost.
  - You are about to drop the `Invoice` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `totalAmount` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_menuId_fkey";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "menuId",
DROP COLUMN "quantity",
DROP COLUMN "total",
DROP COLUMN "transactionId",
ADD COLUMN     "quantities" INTEGER[],
ADD COLUMN     "totalAmount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Invoice";

-- CreateTable
CREATE TABLE "_MenuToTransaction" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_MenuToTransaction_AB_unique" ON "_MenuToTransaction"("A", "B");

-- CreateIndex
CREATE INDEX "_MenuToTransaction_B_index" ON "_MenuToTransaction"("B");

-- AddForeignKey
ALTER TABLE "_MenuToTransaction" ADD CONSTRAINT "_MenuToTransaction_A_fkey" FOREIGN KEY ("A") REFERENCES "Menu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MenuToTransaction" ADD CONSTRAINT "_MenuToTransaction_B_fkey" FOREIGN KEY ("B") REFERENCES "Transaction"("id") ON DELETE CASCADE ON UPDATE CASCADE;
