/*
  Warnings:

  - You are about to alter the column `FicMon` on the `FICHAS_INSCRIPCION` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.

*/
-- AlterTable
ALTER TABLE "FICHAS_INSCRIPCION" ALTER COLUMN "FicMon" SET DATA TYPE DECIMAL(10,2);
