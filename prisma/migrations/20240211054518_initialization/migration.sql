/*
  Warnings:

  - Added the required column `amount` to the `TransactionMenu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TransactionMenu" ADD COLUMN     "amount" INTEGER NOT NULL;
