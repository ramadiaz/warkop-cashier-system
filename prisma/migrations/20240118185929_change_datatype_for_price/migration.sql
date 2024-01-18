/*
  Warnings:

  - Changed the type of `price` on the `menu` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "menu" DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "menu_name_price_key" ON "menu"("name", "price");
