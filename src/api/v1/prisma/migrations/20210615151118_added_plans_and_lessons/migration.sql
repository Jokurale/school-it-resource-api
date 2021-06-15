/*
  Warnings:

  - You are about to drop the column `monday` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `tuesday` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `wednesday` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `thursday` on the `plan` table. All the data in the column will be lost.
  - You are about to drop the column `friday` on the `plan` table. All the data in the column will be lost.
  - The migration will add a unique constraint covering the columns `[number]` on the table `Rooms`. If there are existing duplicate values, the migration will fail.

*/
-- AlterTable
ALTER TABLE `plan` DROP COLUMN `monday`,
    DROP COLUMN `tuesday`,
    DROP COLUMN `wednesday`,
    DROP COLUMN `thursday`,
    DROP COLUMN `friday`;

-- CreateTable
CREATE TABLE `lesson` (
    `id` VARCHAR(191) NOT NULL,
    `day` VARCHAR(191) NOT NULL,
    `hour_id` VARCHAR(191) NOT NULL,
    `room_id` VARCHAR(191) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,
    `teacher_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_lessonToplan` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,
UNIQUE INDEX `_lessonToplan_AB_unique`(`A`, `B`),
INDEX `_lessonToplan_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Rooms.number_unique` ON `Rooms`(`number`);

-- AddForeignKey
ALTER TABLE `lesson` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson` ADD FOREIGN KEY (`subject_id`) REFERENCES `Subjects`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson` ADD FOREIGN KEY (`hour_id`) REFERENCES `Hours`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson` ADD FOREIGN KEY (`room_id`) REFERENCES `Rooms`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_lessonToplan` ADD FOREIGN KEY (`A`) REFERENCES `lesson`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_lessonToplan` ADD FOREIGN KEY (`B`) REFERENCES `plan`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
