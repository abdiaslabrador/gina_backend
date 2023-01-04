import { MigrationInterface, QueryRunner } from "typeorm";

export class correcion1672100001734 implements MigrationInterface {
    name = 'correcion1672100001734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "payment_type" ("id" SERIAL NOT NULL, "name" character varying(128) NOT NULL, "active" boolean NOT NULL DEFAULT true, "type" character varying(64) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updateAt" TIMESTAMP NOT NULL DEFAULT now(), "deleteAt" TIMESTAMP, "currencyId" integer, CONSTRAINT "PK_4f301e328eaf2127773c889ab94" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "payment_type" ADD CONSTRAINT "FK_91bb85ddebdcc4453f0feb3fae0" FOREIGN KEY ("currencyId") REFERENCES "currency"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment_type" DROP CONSTRAINT "FK_91bb85ddebdcc4453f0feb3fae0"`);
        await queryRunner.query(`DROP TABLE "payment_type"`);
    }

}
