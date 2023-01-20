import { MigrationInterface, QueryRunner } from "typeorm";

export class tooth1674157260757 implements MigrationInterface {
    name = 'tooth1674157260757'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tooth" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "e" character varying, "m" character varying, "line" character varying, "question" character varying, "x" character varying, "ring" character varying, "circle" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "odontogramaId" integer, CONSTRAINT "PK_0a71cafc77eae5d19645aff3d63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tooth" ADD CONSTRAINT "FK_bf1642a46f3d435996c776e25ea" FOREIGN KEY ("odontogramaId") REFERENCES "odontograma"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tooth" DROP CONSTRAINT "FK_bf1642a46f3d435996c776e25ea"`);
        await queryRunner.query(`DROP TABLE "tooth"`);
    }

}
