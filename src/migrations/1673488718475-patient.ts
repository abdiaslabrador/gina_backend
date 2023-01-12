import { MigrationInterface, QueryRunner } from "typeorm";

export class patient1673488718475 implements MigrationInterface {
    name = 'patient1673488718475'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_background" RENAME COLUMN "habitos" TO "habits"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_background" RENAME COLUMN "habits" TO "habitos"`);
    }

}
