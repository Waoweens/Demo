/*
  Warnings:

  - Added the required column `id` to the `Yeah` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Yeah" ADD COLUMN     "id" BIGINT NOT NULL,
ADD CONSTRAINT "Yeah_pkey" PRIMARY KEY ("id");
