/*
  Warnings:

  - You are about to drop the `personalinfo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `plan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `personalinfo` DROP FOREIGN KEY `personalinfo_ibfk_1`;

-- DropForeignKey
ALTER TABLE `plan` DROP FOREIGN KEY `plan_ibfk_1`;

-- DropForeignKey
ALTER TABLE `addresses` DROP FOREIGN KEY `addresses_ibfk_1`;

-- DropForeignKey
ALTER TABLE `_lessontoplan` DROP FOREIGN KEY `_lessontoplan_ibfk_2`;

-- DropTable
DROP TABLE `personalinfo`;

-- DropTable
DROP TABLE `plan`;

-- CreateTable
CREATE TABLE `attendance` (
    `id` VARCHAR(191) NOT NULL,
    `date` DATE NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `student_id` VARCHAR(191) NOT NULL,
    `teacher_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonalInfos` (
    `id` VARCHAR(191) NOT NULL,
    `date_of_birth` DATETIME(3) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `middle_name` VARCHAR(191),
    `user_id` VARCHAR(191) NOT NULL,
UNIQUE INDEX `PersonalInfos.email_unique`(`email`),
UNIQUE INDEX `PersonalInfos_user_id_unique`(`user_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plans` (
    `id` VARCHAR(191) NOT NULL,
    `group_id` VARCHAR(191) NOT NULL,
UNIQUE INDEX `Plans.group_id_unique`(`group_id`),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `attendance` ADD FOREIGN KEY (`teacher_id`) REFERENCES `Teachers`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendance` ADD FOREIGN KEY (`student_id`) REFERENCES `Students`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonalInfos` ADD FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plans` ADD FOREIGN KEY (`group_id`) REFERENCES `Groups`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Addresses` ADD FOREIGN KEY (`personal_info_id`) REFERENCES `PersonalInfos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_lessonToplan` ADD FOREIGN KEY (`B`) REFERENCES `Plans`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
