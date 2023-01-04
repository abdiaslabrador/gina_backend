import { MigrationInterface, QueryRunner } from "typeorm";

export class tablasDocus1672611183844 implements MigrationInterface {
    name = 'tablasDocus1672611183844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bill" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "docId" integer, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_8d733f52590bf62052d81f68414" FOREIGN KEY ("docId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_8d733f52590bf62052d81f68414"`);
        await queryRunner.query(`DROP TABLE "bill"`);
    }

}
