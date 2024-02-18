/*
  Warnings:

  - You are about to drop the `Cashier` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_cashierId_fkey";

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "cashierId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "address" TEXT,
ADD COLUMN     "contact" TEXT,
ADD COLUMN     "role" TEXT;

-- DropTable
DROP TABLE "Cashier";

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_cashierId_fkey" FOREIGN KEY ("cashierId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
