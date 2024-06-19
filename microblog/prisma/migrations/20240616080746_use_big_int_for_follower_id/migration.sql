/*
  Warnings:

  - Added the required column `id` to the `Follower` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Follower" ADD COLUMN     "id" BIGINT NOT NULL,
ADD CONSTRAINT "Follower_pkey" PRIMARY KEY ("id");
