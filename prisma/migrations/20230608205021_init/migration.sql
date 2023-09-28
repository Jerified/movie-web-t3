/*
  Warnings:

  - You are about to drop the `_Watchlist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_Watchlist_B_index";

-- DropIndex
DROP INDEX "_Watchlist_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_Watchlist";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" TEXT NOT NULL,
    "imdb_id" TEXT,
    "original_title" TEXT,
    "adult" BOOLEAN,
    "backdrop_path" TEXT,
    "media_type" TEXT,
    "original_language" TEXT,
    "overview" TEXT,
    "poster_path" TEXT,
    "title" TEXT,
    "release_date" TEXT,
    "vote_average" INTEGER,
    "vote_count" INTEGER,
    "runtime" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Movie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Movie" ("adult", "backdrop_path", "createdAt", "id", "imdb_id", "media_type", "movieId", "original_language", "original_title", "overview", "poster_path", "release_date", "runtime", "title", "updatedAt", "userId", "vote_average", "vote_count") SELECT "adult", "backdrop_path", "createdAt", "id", "imdb_id", "media_type", "movieId", "original_language", "original_title", "overview", "poster_path", "release_date", "runtime", "title", "updatedAt", "userId", "vote_average", "vote_count" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_movieId_userId_key" ON "Movie"("movieId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
