import { MigrationInterface, QueryRunner } from "typeorm";

export class tablasDocus1672610150041 implements MigrationInterface {
    name = 'tablasDocus1672610150041'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_5a9f840af32bc7e1fd85d5037c7"`);
        await queryRunner.query(`ALTER TABLE "document_det" RENAME COLUMN "documentId" TO "docId"`);
        await queryRunner.query(`CREATE TABLE "document_payment" ("id" SERIAL NOT NULL, "cant" integer NOT NULL, "price_ref" numeric(12,2) NOT NULL, "price_sold" numeric(12,2) NOT NULL, "total" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "docId" integer, "paymentId" integer, CONSTRAINT "PK_99a986775b853467b33a460249a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_82666a8f1549c8c7f0fe91b6814" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_dcefc8b09340eb9c962529e100b" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_ab0fd107e4f9147f60ca0e8cd5c" FOREIGN KEY ("paymentId") REFERENCES "payment_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_ab0fd107e4f9147f60ca0e8cd5c"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_dcefc8b09340eb9c962529e100b"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_82666a8f1549c8c7f0fe91b6814"`);
        await queryRunner.query(`DROP TABLE "document_payment"`);
        await queryRunner.query(`ALTER TABLE "document_det" RENAME COLUMN "docId" TO "documentId"`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_5a9f840af32bc7e1fd85d5037c7" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
