-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StartStream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_StartStream" ("id", "timestamp") SELECT "id", "timestamp" FROM "StartStream";
DROP TABLE "StartStream";
ALTER TABLE "new_StartStream" RENAME TO "StartStream";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
