/*
  Warnings:

  - Added the required column `hour_id` to the `attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `attendance` ADD COLUMN     `hour_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `attendance` ADD FOREIGN KEY (`hour_id`) REFERENCES `Hours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
