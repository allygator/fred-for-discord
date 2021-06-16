-- CreateTable
CREATE TABLE "Users" (
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Users.name_unique" ON "Users"("name");
