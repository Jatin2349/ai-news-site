-- CreateTable
CREATE TABLE "NewsItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "sourceUrl" TEXT NOT NULL,
    "sourceName" TEXT NOT NULL,
    "sourceDomain" TEXT,
    "publishedAt" DATETIME NOT NULL,
    "summary" TEXT NOT NULL,
    "keypoints" JSONB NOT NULL,
    "category" TEXT NOT NULL,
    "tags" JSONB,
    "keywords" JSONB,
    "imageUrl" TEXT,
    "lang" TEXT NOT NULL DEFAULT 'en',
    "words" INTEGER,
    "urlHash" TEXT NOT NULL,
    "isDuplicateOf" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "NewsItem_sourceUrl_key" ON "NewsItem"("sourceUrl");

-- CreateIndex
CREATE UNIQUE INDEX "NewsItem_urlHash_key" ON "NewsItem"("urlHash");
