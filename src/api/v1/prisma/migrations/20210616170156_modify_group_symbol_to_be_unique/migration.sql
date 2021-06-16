/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Groups.symbol_unique` ON `Groups`(`symbol`);
