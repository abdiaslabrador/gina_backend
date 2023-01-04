import { MigrationInterface, QueryRunner } from "typeorm";

export class tablaDocu1672607537052 implements MigrationInterface {
    name = 'tablaDocu1672607537052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "document_date" TIMESTAMP NOT NULL, "currency_day_value" numeric(12,2) NOT NULL, "change" numeric(12,2) NOT NULL, "subtotal" numeric(12,2) NOT NULL, "discount" numeric(12,2) NOT NULL, "total" numeric(12,2) NOT NULL, "total_payed" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "client" ADD "documentId" integer`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_94b563b35c69f522757765933c8" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_94b563b35c69f522757765933c8"`);
        await queryRunner.query(`ALTER TABLE "client" DROP COLUMN "documentId"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}
