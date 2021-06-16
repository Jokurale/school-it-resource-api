/*
  Warnings:

  - You are about to drop the `_lessontoplan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_lessontoplan` DROP FOREIGN KEY `_lessontoplan_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_lessontoplan` DROP FOREIGN KEY `_lessontoplan_ibfk_2`;

-- DropForeignKey
ALTER TABLE `plans` DROP FOREIGN KEY `plans_ibfk_1`;

-- DropTable
DROP TABLE `_lessontoplan`;

-- DropTable
DROP TABLE `plans`;

-- CreateTable
CREATE TABLE `Schedules` (
    `id` VARCHAR(191) NOT NULL,
    `group_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Schedules.group_id_unique`(`group_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_lessonToschedule` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_lessonToschedule_AB_unique`(`A`, `B`),
    INDEX `_lessonToschedule_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Schedules` ADD FOREIGN KEY (`group_id`) REFERENCES `Groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_lessonToschedule` ADD FOREIGN KEY (`A`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_lessonToschedule` ADD FOREIGN KEY (`B`) REFERENCES `Schedules`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
