import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyArticleTables1710932690640 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE article_content ADD COLUMN thumbnail_url VARCHAR(255) NOT NULL DEFAULT '';
      ALTER TABLE article ADD COLUMN slug VARCHAR(100) NOT NULL DEFAULT '';

      ALTER TABLE category ADD COLUMN published BOOLEAN DEFAULT FALSE;
      ALTER TABLE category ADD COLUMN published_at TIMESTAMP;
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE article DROP COLUMN image_url;
      ALTER TABLE article DROP COLUMN slug;

      ALTER TABLE category DROP COLUMN published;
      ALTER TABLE category DROP COLUMN published_at;
    `)
  }
}
