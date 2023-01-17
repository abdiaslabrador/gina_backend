import { MigrationInterface, QueryRunner } from "typeorm";

export class appointment1673887060353 implements MigrationInterface {
    name = 'appointment1673887060353'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "appointment_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_5676c70c29b902bfd7241a86ea" UNIQUE ("patientId"), CONSTRAINT "PK_e2580899aa87ff1935c8d793181" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "appointment_date" text, "reason" text, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "appointmentHistoryId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_102c4da56a8d76d03bbe1287d0e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "appointment_history" ADD CONSTRAINT "FK_5676c70c29b902bfd7241a86ea2" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a836056700742d466504806aa46" FOREIGN KEY ("appointmentHistoryId") REFERENCES "appointment_history"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a836056700742d466504806aa46"`);
        await queryRunner.query(`ALTER TABLE "appointment_history" DROP CONSTRAINT "FK_5676c70c29b902bfd7241a86ea2"`);
        await queryRunner.query(`DROP TABLE "patient_history"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "appointment_history"`);
    }

}
