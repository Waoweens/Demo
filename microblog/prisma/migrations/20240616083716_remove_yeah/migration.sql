/*
  Warnings:

  - You are about to drop the `Yeah` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Yeah" DROP CONSTRAINT "Yeah_postId_fkey";

-- DropForeignKey
ALTER TABLE "Yeah" DROP CONSTRAINT "Yeah_userId_fkey";

-- DropTable
DROP TABLE "Yeah";

-- CreateTable
CREATE TABLE "_Yeahs" (
    "A" BIGINT NOT NULL,
    "B" BIGINT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_Yeahs_AB_unique" ON "_Yeahs"("A", "B");

-- CreateIndex
CREATE INDEX "_Yeahs_B_index" ON "_Yeahs"("B");

-- AddForeignKey
ALTER TABLE "_Yeahs" ADD CONSTRAINT "_Yeahs_A_fkey" FOREIGN KEY ("A") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Yeahs" ADD CONSTRAINT "_Yeahs_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
