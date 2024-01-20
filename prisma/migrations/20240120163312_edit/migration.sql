/*
  Warnings:

  - Added the required column `stock` to the `menu` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `menu` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Food', 'Drink', 'Snack', 'Other');

-- AlterTable
ALTER TABLE "menu" ADD COLUMN     "stock" INTEGER NOT NULL,
ADD COLUMN     "type" "Type" NOT NULL;
