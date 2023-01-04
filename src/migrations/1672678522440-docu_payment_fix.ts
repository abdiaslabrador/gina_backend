import { MigrationInterface, QueryRunner } from "typeorm";

export class docuPaymentFix1672678522440 implements MigrationInterface {
    name = 'docuPaymentFix1672678522440'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "cant"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "price_ref"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "price_sold"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "payment_date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "currency_day_value" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "currency_amount" numeric(12,2)`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "amount" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "detail" text NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "detail"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "currency_amount"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "currency_day_value"`);
        await queryRunner.query(`ALTER TABLE "document_payment" DROP COLUMN "payment_date"`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "total" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "price_sold" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "price_ref" numeric(12,2) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document_payment" ADD "cant" integer NOT NULL`);
    }

}
