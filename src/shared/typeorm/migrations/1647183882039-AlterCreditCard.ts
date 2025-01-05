import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterCreditCard1647183882039 implements MigrationInterface {
  name = 'AlterCreditCard1647183882039';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creditCards" ADD "cardBalance" integer NOT NULL DEFAULT '0'`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "creditCards" DROP COLUMN "cardBalance"`,
    );
  }
}
