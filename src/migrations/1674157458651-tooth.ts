import { MigrationInterface, QueryRunner } from "typeorm";

export class tooth1674157458651 implements MigrationInterface {
    name = 'tooth1674157458651'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tooth_parts" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "point" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "toothId" integer, CONSTRAINT "PK_8e4da62902b6d63c96d9d4b2545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tooth_parts" ADD CONSTRAINT "FK_fa7d37056cff05f5b722cc8beac" FOREIGN KEY ("toothId") REFERENCES "tooth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tooth_parts" DROP CONSTRAINT "FK_fa7d37056cff05f5b722cc8beac"`);
        await queryRunner.query(`DROP TABLE "tooth_parts"`);
    }

}
