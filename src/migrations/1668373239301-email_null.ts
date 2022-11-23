import { MigrationInterface, QueryRunner } from "typeorm";

export class emailNull1668373239301 implements MigrationInterface {
    name = 'emailNull1668373239301'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "email" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ALTER COLUMN "email" SET NOT NULL`);
    }

}
