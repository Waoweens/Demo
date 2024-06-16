-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "quoteParentId" BIGINT,
ADD COLUMN     "replyParentId" BIGINT,
ADD COLUMN     "repostParentId" BIGINT;

-- CreateTable
CREATE TABLE "Yeah" (
    "id" BIGSERIAL NOT NULL,
    "postId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,

    CONSTRAINT "Yeah_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Yeah_postId_userId_key" ON "Yeah"("postId", "userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_replyParentId_fkey" FOREIGN KEY ("replyParentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_repostParentId_fkey" FOREIGN KEY ("repostParentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_quoteParentId_fkey" FOREIGN KEY ("quoteParentId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yeah" ADD CONSTRAINT "Yeah_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Yeah" ADD CONSTRAINT "Yeah_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
