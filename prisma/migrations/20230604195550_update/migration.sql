/*
  Warnings:

  - Added the required column `imdb_id` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `original_title` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runtime` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_average` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vote_count` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Movie" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "movieId" INTEGER NOT NULL,
    "imdb_id" TEXT NOT NULL,
    "original_title" TEXT NOT NULL,
    "adult" BOOLEAN NOT NULL,
    "backdrop_path" TEXT NOT NULL,
    "media_type" TEXT NOT NULL,
    "original_language" TEXT NOT NULL,
    "overview" TEXT NOT NULL,
    "poster_path" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "release_date" TEXT NOT NULL,
    "vote_average" INTEGER NOT NULL,
    "vote_count" INTEGER NOT NULL,
    "runtime" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL
);
INSERT INTO "new_Movie" ("adult", "backdrop_path", "createdAt", "id", "media_type", "movieId", "original_language", "overview", "poster_path", "release_date", "title", "updatedAt", "userId") SELECT "adult", "backdrop_path", "createdAt", "id", "media_type", "movieId", "original_language", "overview", "poster_path", "release_date", "title", "updatedAt", "userId" FROM "Movie";
DROP TABLE "Movie";
ALTER TABLE "new_Movie" RENAME TO "Movie";
CREATE UNIQUE INDEX "Movie_movieId_userId_key" ON "Movie"("movieId", "userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
