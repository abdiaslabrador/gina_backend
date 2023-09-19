import { MigrationInterface, QueryRunner } from "typeorm";

export class NewMigration1681493341400 implements MigrationInterface {
    name = 'NewMigration1681493341400'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "patient_background" ("id" SERIAL NOT NULL, "rm" text, "app" text, "ah" text, "apf" text, "habits" text, "need_child_edentigrama" boolean DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_09986058c6be793383052f9935" UNIQUE ("patientId"), CONSTRAINT "PK_38409a4da47687d5fe46a556393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tooth_parts" ("id" SERIAL NOT NULL, "one" character varying, "two" character varying, "three" character varying, "four" character varying, "five" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "toothId" integer, CONSTRAINT "REL_fa7d37056cff05f5b722cc8bea" UNIQUE ("toothId"), CONSTRAINT "PK_8e4da62902b6d63c96d9d4b2545" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tooth" ("id" SERIAL NOT NULL, "number" integer NOT NULL, "e" character varying, "m" character varying, "question" boolean NOT NULL DEFAULT false, "line" character varying, "circle" character varying, "ring" character varying, "x" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "odontogramaId" integer, CONSTRAINT "PK_0a71cafc77eae5d19645aff3d63" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "odontograma" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_ef10e8e0d599ab490f52f26ff1" UNIQUE ("patientId"), CONSTRAINT "PK_c1bc426b15fc57bbf5a7983344c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "sex" character varying(64) NOT NULL, "birthday" TIMESTAMP NOT NULL, "phone_number" character varying(64), "direction" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c43dd11aa920ddbc4b6e27fc93" ON "patient" ("ci_rif") `);
        await queryRunner.query(`CREATE TABLE "appointment_history" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_5676c70c29b902bfd7241a86ea" UNIQUE ("patientId"), CONSTRAINT "PK_e2580899aa87ff1935c8d793181" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "appointment" ("id" SERIAL NOT NULL, "appointment_date" text, "reason" text, "description" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "appointmentHistoryId" integer, CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "phone_number" character varying(64), "direction" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_498626b906945d85ac95b50cf8" ON "client" ("ci_rif") `);
        await queryRunner.query(`CREATE TABLE "product" ("id" SERIAL NOT NULL, "code" character varying(10) NOT NULL, "cant" integer NOT NULL DEFAULT '0', "description" text NOT NULL, "price" numeric(12,2) NOT NULL, "price_ref" numeric(12,2) NOT NULL, "admit_update_currency" boolean NOT NULL DEFAULT true, "enable_cant" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_99c39b067cfa73c783f0fc49a6" ON "product" ("code") `);
        await queryRunner.query(`CREATE TABLE "document_det" ("id" SERIAL NOT NULL, "cant" integer NOT NULL, "price_ref" numeric(12,2) NOT NULL, "price_sold" numeric(12,2) NOT NULL, "subtotal" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "docuId" integer, "productId" integer, CONSTRAINT "PK_66c2b3ef5b7830cb110f40ad071" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "currency" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "today_currency" numeric(12,2) NOT NULL, "active" boolean NOT NULL DEFAULT true, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_3cda65c731a6264f0e444cc9b91" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment_type" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "active" boolean NOT NULL DEFAULT true, "type" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "currencyId" integer, CONSTRAINT "PK_4f301e328eaf2127773c889ab94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_payment" ("id" SERIAL NOT NULL, "payment_date" TIMESTAMP NOT NULL, "currency_day_value" numeric(12,2), "currency_amount" numeric(12,2), "amount" numeric(12,2) NOT NULL, "detail" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "docuId" integer, "paymentId" integer, CONSTRAINT "PK_99a986775b853467b33a460249a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "document_date" TIMESTAMP NOT NULL, "currency_day_value" numeric(12,2) NOT NULL, "subtotal" numeric(12,2) NOT NULL, "discount" numeric(12,2) NOT NULL, "total" numeric(12,2) NOT NULL, "total_payed" numeric(12,2) NOT NULL, "change" numeric(12,2) NOT NULL, "canceled" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "clientId" integer, CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bill" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "docuId" integer, CONSTRAINT "PK_683b47912b8b30fe71d1fa22199" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "phone_number" character varying(64), "birthday" TIMESTAMP NOT NULL, "direction" text, "email" character varying(264), "password" character varying(264) NOT NULL, "active" boolean NOT NULL DEFAULT true, "secretary" boolean NOT NULL DEFAULT true, "superuser" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86e38c629d9975cb6299254fac" ON "employee" ("ci_rif") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_817d1d427138772d47eca04885" ON "employee" ("email") `);
        await queryRunner.query(`ALTER TABLE "patient_background" ADD CONSTRAINT "FK_09986058c6be793383052f99358" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tooth_parts" ADD CONSTRAINT "FK_fa7d37056cff05f5b722cc8beac" FOREIGN KEY ("toothId") REFERENCES "tooth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tooth" ADD CONSTRAINT "FK_bf1642a46f3d435996c776e25ea" FOREIGN KEY ("odontogramaId") REFERENCES "odontograma"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "odontograma" ADD CONSTRAINT "FK_ef10e8e0d599ab490f52f26ff1e" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment_history" ADD CONSTRAINT "FK_5676c70c29b902bfd7241a86ea2" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "appointment" ADD CONSTRAINT "FK_a836056700742d466504806aa46" FOREIGN KEY ("appointmentHistoryId") REFERENCES "appointment_history"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_5e3901ce0e81b62b1b200ac3f3d" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_det" ADD CONSTRAINT "FK_a315d1317003cae51e80f7e7dfd" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "payment_type" ADD CONSTRAINT "FK_91bb85ddebdcc4453f0feb3fae0" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_179cd2e68767ab3c83accda92fa" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD CONSTRAINT "FK_ab0fd107e4f9147f60ca0e8cd5c" FOREIGN KEY ("paymentId") REFERENCES "payment_type"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_ba81651e4c4251969ba7bcbd1bc" FOREIGN KEY ("clientId") REFERENCES "client"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bill" ADD CONSTRAINT "FK_73377dd13bda694e36a47509a5a" FOREIGN KEY ("docuId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bill" DROP CONSTRAINT "FK_73377dd13bda694e36a47509a5a"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_ba81651e4c4251969ba7bcbd1bc"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_ab0fd107e4f9147f60ca0e8cd5c"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP CONSTRAINT "FK_179cd2e68767ab3c83accda92fa"`);
        await queryRunner.query(`ALTER TABLE "payment_type" DROP CONSTRAINT "FK_91bb85ddebdcc4453f0feb3fae0"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_a315d1317003cae51e80f7e7dfd"`);
        await queryRunner.query(`ALTER TABLE "document_det" DROP CONSTRAINT "FK_5e3901ce0e81b62b1b200ac3f3d"`);
        await queryRunner.query(`ALTER TABLE "appointment" DROP CONSTRAINT "FK_a836056700742d466504806aa46"`);
        await queryRunner.query(`ALTER TABLE "appointment_history" DROP CONSTRAINT "FK_5676c70c29b902bfd7241a86ea2"`);
        await queryRunner.query(`ALTER TABLE "odontograma" DROP CONSTRAINT "FK_ef10e8e0d599ab490f52f26ff1e"`);
        await queryRunner.query(`ALTER TABLE "tooth" DROP CONSTRAINT "FK_bf1642a46f3d435996c776e25ea"`);
        await queryRunner.query(`ALTER TABLE "tooth_parts" DROP CONSTRAINT "FK_fa7d37056cff05f5b722cc8beac"`);
        await queryRunner.query(`ALTER TABLE "patient_background" DROP CONSTRAINT "FK_09986058c6be793383052f99358"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_817d1d427138772d47eca04885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86e38c629d9975cb6299254fac"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "bill"`);
        await queryRunner.query(`DROP TABLE "document"`);
        await queryRunner.query(`DROP TABLE "document_payment"`);
        await queryRunner.query(`DROP TABLE "payment_type"`);
        await queryRunner.query(`DROP TABLE "currency"`);
        await queryRunner.query(`DROP TABLE "document_det"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_99c39b067cfa73c783f0fc49a6"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_498626b906945d85ac95b50cf8"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "appointment"`);
        await queryRunner.query(`DROP TABLE "appointment_history"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43dd11aa920ddbc4b6e27fc93"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "odontograma"`);
        await queryRunner.query(`DROP TABLE "tooth"`);
        await queryRunner.query(`DROP TABLE "tooth_parts"`);
        await queryRunner.query(`DROP TABLE "patient_background"`);
    }

}
