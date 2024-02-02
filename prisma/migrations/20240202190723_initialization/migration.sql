/*
  Warnings:

  - Added the required column `cashier` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "cashier" TEXT NOT NULL,
ADD COLUMN     "transactionId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "WarkopData" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,

    CONSTRAINT "WarkopData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cashier" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contact" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "cashier_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" SERIAL NOT NULL,
    "cashier" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
