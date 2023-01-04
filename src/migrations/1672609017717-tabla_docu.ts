import { MigrationInterface, QueryRunner } from "typeorm";

export class tablaDocu1672609017717 implements MigrationInterface {
    name = 'tablaDocu1672609017717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document_det" ("id" SERIAL NOT NULL, "cant" integer NOT NULL, "price_ref" numeric(12,2) NOT NULL, "price_sold" numeric(12,2) NOT NULL, "total" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "documentId" integer, CONSTRAINT "PK_66c2b3ef5b7830cb110f40ad071" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_5a9f840af32bc7e1fd85d5037c7" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_5a9f840af32bc7e1fd85d5037c7"`);
        await queryRunner.query(`DROP TABLE "document_det"`);
    }

}
