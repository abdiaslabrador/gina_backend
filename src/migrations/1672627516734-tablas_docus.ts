import { MigrationInterface, QueryRunner } from "typeorm";

export class tablasDocus1672627516734 implements MigrationInterface {
    name = 'tablasDocus1672627516734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_82666a8f1549c8c7f0fe91b6814"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_dcefc8b09340eb9c962529e100b"`);
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_8d733f52590bf62052d81f68414"`);
        await queryRunner.query(`ALTER TABLE "document_payment" RENAME COLUMN "docId" TO "docuId"`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "docId" TO "docuId"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP COLUMN "docId"`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD "subtotal" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD "docuId" integer`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_5e3901ce0e81b62b1b200ac3f3d" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_179cd2e68767ab3c83accda92fa" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_73377dd13bda694e36a47509a5a" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_73377dd13bda694e36a47509a5a"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_179cd2e68767ab3c83accda92fa"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_5e3901ce0e81b62b1b200ac3f3d"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP COLUMN "docuId"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP COLUMN "subtotal"`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD "docId" integer`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD "total" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bill" RENAME COLUMN "docuId" TO "docId"`);
        await queryRunner.query(`ALTER TABLE "document_payment" RENAME COLUMN "docuId" TO "docId"`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_8d733f52590bf62052d81f68414" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_dcefc8b09340eb9c962529e100b" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_82666a8f1549c8c7f0fe91b6814" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
