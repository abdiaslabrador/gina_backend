import { MigrationInterface, QueryRunner } from "typeorm";

export class patient1673400753928 implements MigrationInterface {
    name = 'patient1673400753928'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_background" ("id" SERIAL NOT NULL, "rm" text, "app" text, "ah" text, "apf" text, "habitos" text, "need_child_edentigrama" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_09986058c6be793383052f9935" UNIQUE ("patientId"), CONSTRAINT "PK_38409a4da47687d5fe46a556393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "sex" character varying(64) NOT NULL, "birthday" TIMESTAMP NOT NULL, "phone_number" character varying(64), "direction" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c43dd11aa920ddbc4b6e27fc93" ON "patient" ("ci_rif") `);
        await queryRunner.query(`ALTER TABLE "patient_background" ADD CONSTRAINT "FK_09986058c6be793383052f99358" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "patient_background" DROP CONSTRAINT "FK_09986058c6be793383052f99358"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43dd11aa920ddbc4b6e27fc93"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "patient_background"`);
    }

}
