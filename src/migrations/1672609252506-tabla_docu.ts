import { MigrationInterface, QueryRunner } from "typeorm";

export class tablaDocu1672609252506 implements MigrationInterface {
    name = 'tablaDocu1672609252506'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_det" ADD "productId" integer`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_a315d1317003cae51e80f7e7dfd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_a315d1317003cae51e80f7e7dfd"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP COLUMN "productId"`);
    }

}
