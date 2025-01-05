import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateCreditCard1638572298248 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'creditCards',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isNullable: false,
            generationStrategy: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'limit',
            type: 'decimal',
            precision: 10,
            scale: 2,
          },
          {
            name: 'close',
            type: 'varchar',
          },
          {
            name: 'win',
            type: 'varchar',
          },
          {
            name: 'bank',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('creditCards');
  }
}
