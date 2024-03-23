import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateAppeal1711199228378 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE appeal_type AS ENUM ('join', 'revalidation');

      CREATE TABLE appeal (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        email VARCHAR(255) NOT NULL,
        type appeal_type NOT NULL,
        ipn BIGINT NOT NULL,
        age INTEGER NOT NULL,
        finished_at TIMESTAMP NOT NULL
      );

      CREATE UNIQUE INDEX idx_appeal_email 
        ON appeal (email);
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_appeal_email;
      DROP TABLE appeal;
      DROP TYPE appeal_type;
    `)
  }
}
