-- CreateTable
CREATE TABLE "Keys" (
    "name" TEXT NOT NULL,
    "dungeon" TEXT NOT NULL,
    "level" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Keys.name_unique" ON "Keys"("name");
