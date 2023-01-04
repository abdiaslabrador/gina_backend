import { MigrationInterface, QueryRunner } from "typeorm";

export class tablaDocu1672608062384 implements MigrationInterface {
    name = 'tablaDocu1672608062384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_94b563b35c69f522757765933c8"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "documentId"`);
        await queryRunner.query(`ALTER TABLE "document" ADD "clientId" integer`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_ba81651e4c4251969ba7bcbd1bc" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_ba81651e4c4251969ba7bcbd1bc"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "clientId"`);
        await queryRunner.query(`ALTER TABLE "client" ADD "documentId" integer`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_94b563b35c69f522757765933c8" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
