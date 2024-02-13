/*
  Warnings:

  - Added the required column `cash` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `change` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "cash" INTEGER NOT NULL,
ADD COLUMN     "change" INTEGER NOT NULL;
