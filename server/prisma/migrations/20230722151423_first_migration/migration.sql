-- CreateTable
CREATE TABLE "User" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "Password" TEXT NOT NULL,
    "Class" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Theme" (
    "Id" SERIAL NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Question" (
    "Id" SERIAL NOT NULL,
    "ThemeId" INTEGER NOT NULL,
    "Contents" TEXT NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("Id")
);

-- CreateTable
CREATE TABLE "Verify" (
    "Email" TEXT NOT NULL,
    "Name" TEXT NOT NULL,

    CONSTRAINT "Verify_pkey" PRIMARY KEY ("Email")
);

-- CreateTable
CREATE TABLE "Comment" (
    "Id" SERIAL NOT NULL,
    "QuestionId" INTEGER NOT NULL,
    "AuthorId" INTEGER NOT NULL,
    "Contents" TEXT NOT NULL,
    "Class" INTEGER NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_ThemeId_fkey" FOREIGN KEY ("ThemeId") REFERENCES "Theme"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_QuestionId_fkey" FOREIGN KEY ("QuestionId") REFERENCES "Question"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_AuthorId_fkey" FOREIGN KEY ("AuthorId") REFERENCES "User"("Id") ON DELETE RESTRICT ON UPDATE CASCADE;
