import { MigrationInterface, QueryRunner } from "typeorm";

export class tablesconfig1668293266483 implements MigrationInterface {
    name = 'tablesconfig1668293266483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo_metadata" ("id" SERIAL NOT NULL, "height" integer NOT NULL, "width" integer NOT NULL, "orientation" character varying NOT NULL, "compressed" boolean NOT NULL, "comment" character varying NOT NULL, "photoId" integer, CONSTRAINT "REL_99f01ed52303cc16139d69f746" UNIQUE ("photoId"), CONSTRAINT "PK_da29f04585dc190eb00e4d73420" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "photo" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "descripcion" text NOT NULL, "filename" character varying NOT NULL, "views" numeric(12,2) NOT NULL, "isPublished" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "authorId" integer, CONSTRAINT "PK_723fa50bf70dcfd06fb5a44d4ff" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "employee" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "phone_number" character varying(64), "birthday" TIMESTAMP NOT NULL, "direction" text, "email" character varying(264) NOT NULL, "password" character varying(264) NOT NULL, "active" boolean NOT NULL DEFAULT true, "secretario" boolean NOT NULL DEFAULT true, "superuser" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_86e38c629d9975cb6299254fac" ON "employee" ("ci_rif") `);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_817d1d427138772d47eca04885" ON "employee" ("email") `);
        await queryRunner.query(`CREATE TABLE "patient_background" ("id" SERIAL NOT NULL, "rm" text NOT NULL, "app" text NOT NULL, "ah" text NOT NULL, "apf" text NOT NULL, "habitos" text NOT NULL, "need_child_edentigrama" boolean NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "patientId" integer, CONSTRAINT "REL_09986058c6be793383052f9935" UNIQUE ("patientId"), CONSTRAINT "PK_38409a4da47687d5fe46a556393" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "patient" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "phone_number" character varying(64), "sex" character varying(64) NOT NULL, "birthday" TIMESTAMP NOT NULL, "direction" text, "email" character varying(264), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_8dfa510bb29ad31ab2139fbfb99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_c43dd11aa920ddbc4b6e27fc93" ON "patient" ("ci_rif") `);
        await queryRunner.query(`CREATE TABLE "personal_info" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "last_name" character varying(128) NOT NULL, "ci_rif" character varying(64) NOT NULL, "phone_number" character varying(64), "sex" character varying(64) NOT NULL, "birthday" TIMESTAMP NOT NULL, "direction" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, CONSTRAINT "PK_c202a62653f38aa39c4518f02bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_85d472c4f6275731b4ea5a7eb8" ON "personal_info" ("ci_rif") `);
        await queryRunner.query(`CREATE TABLE "producto" ("id" SERIAL NOT NULL, "product_name" character varying NOT NULL, "description" text NOT NULL, "bs_price" numeric(12,2) NOT NULL, "ds_price" numeric(12,2) NOT NULL, "cant" integer NOT NULL, CONSTRAINT "PK_5be023b11909fe103e24c740c7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "album_photos_photo" ("albumId" integer NOT NULL, "photoId" integer NOT NULL, CONSTRAINT "PK_d6508e57e194669e6b77bee307d" PRIMARY KEY ("albumId", "photoId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_fb5deea2817dea41af76b11fd1" ON "album_photos_photo" ("albumId") `);
        await queryRunner.query(`CREATE INDEX "IDX_d292b18c5fbb585c8ddb959ea8" ON "album_photos_photo" ("photoId") `);
        await queryRunner.query(`ALTER TABLE "photo_metadata" ADD CONSTRAINT "FK_99f01ed52303cc16139d69f7464" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "photo" ADD CONSTRAINT "FK_c073d197b41cfbeb09835ca233c" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "patient_background" ADD CONSTRAINT "FK_09986058c6be793383052f99358" FOREIGN KEY ("patientId") REFERENCES "patient"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_fb5deea2817dea41af76b11fd15" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" ADD CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81" FOREIGN KEY ("photoId") REFERENCES "photo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_d292b18c5fbb585c8ddb959ea81"`);
        await queryRunner.query(`ALTER TABLE "album_photos_photo" DROP CONSTRAINT "FK_fb5deea2817dea41af76b11fd15"`);
        await queryRunner.query(`ALTER TABLE "patient_background" DROP CONSTRAINT "FK_09986058c6be793383052f99358"`);
        await queryRunner.query(`ALTER TABLE "photo" DROP CONSTRAINT "FK_c073d197b41cfbeb09835ca233c"`);
        await queryRunner.query(`ALTER TABLE "photo_metadata" DROP CONSTRAINT "FK_99f01ed52303cc16139d69f7464"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d292b18c5fbb585c8ddb959ea8"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fb5deea2817dea41af76b11fd1"`);
        await queryRunner.query(`DROP TABLE "album_photos_photo"`);
        await queryRunner.query(`DROP TABLE "producto"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85d472c4f6275731b4ea5a7eb8"`);
        await queryRunner.query(`DROP TABLE "personal_info"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c43dd11aa920ddbc4b6e27fc93"`);
        await queryRunner.query(`DROP TABLE "patient"`);
        await queryRunner.query(`DROP TABLE "patient_background"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_817d1d427138772d47eca04885"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_86e38c629d9975cb6299254fac"`);
        await queryRunner.query(`DROP TABLE "employee"`);
        await queryRunner.query(`DROP TABLE "album"`);
        await queryRunner.query(`DROP TABLE "photo"`);
        await queryRunner.query(`DROP TABLE "photo_metadata"`);
        await queryRunner.query(`DROP TABLE "author"`);
    }

}
