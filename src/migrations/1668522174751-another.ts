import { MigrationInterface, QueryRunner } from "typeorm";

export class another1668522174751 implements MigrationInterface {
    name = 'another1668522174751'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "secretario" TO "secretary"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" RENAME COLUMN "secretary" TO "secretario"`);
    }

}
