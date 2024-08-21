-- CreateTable
CREATE TABLE "Stories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "caterogy" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cover" TEXT NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Stories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapters" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "story" TEXT NOT NULL,
    "storyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "Stories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
