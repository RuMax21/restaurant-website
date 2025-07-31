/*
  Warnings:

  - The values [CONFIRMED,REJECTED] on the enum `Status` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Status_new" AS ENUM ('PENDING', 'DEPOSITED', 'WAITING_PAYMENT', 'FINISHED', 'CANCELLED');
ALTER TABLE "Reservation" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Reservation" ALTER COLUMN "status" TYPE "Status_new" USING ("status"::text::"Status_new");
ALTER TYPE "Status" RENAME TO "Status_old";
ALTER TYPE "Status_new" RENAME TO "Status";
DROP TYPE "Status_old";
ALTER TABLE "Reservation" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Reservation" ADD COLUMN     "time" TEXT NOT NULL,
ADD COLUMN     "wasPaid" BOOLEAN NOT NULL DEFAULT false;
