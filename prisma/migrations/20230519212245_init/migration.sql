-- CreateTable
CREATE TABLE "transactions" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "value" REAL NOT NULL DEFAULT 0,
    "createAt" DATETIME DEFAULT CURRENT_TIMESTAMP,
    "updateAt" DATETIME
);
