-- CreateTable
CREATE TABLE "Result" (
    "answerId" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("answerId")
);

-- CreateIndex
CREATE INDEX "Result_answerId_idx" ON "Result"("answerId");
