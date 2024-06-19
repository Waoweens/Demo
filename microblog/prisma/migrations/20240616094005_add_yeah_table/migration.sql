/*
  Warnings:

  - You are about to drop the `_Yeahs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_Yeahs" DROP CONSTRAINT "_Yeahs_A_fkey";

-- DropForeignKey
ALTER TABLE "_Yeahs" DROP CONSTRAINT "_Yeahs_B_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "id" DROP DEFAULT;
DROP SEQUENCE "Post_id_seq";

-- DropTable
DROP TABLE "_Yeahs";

-- CreateTable
CREATE TABLE "Yeah" (
    "userId" BIGINT NOT NULL,
    "postId" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Yeah_userId_postId_key" ON "Yeah"("userId", "postId");

-- AddForeignKey
ALTER TABLE "Yeah" ADD CONSTRAINT "Yeah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yeah" ADD CONSTRAINT "Yeah_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
