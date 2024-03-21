import { MigrationInterface, QueryRunner } from 'typeorm'

export class ModifyArticleTables1710932690640 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DELETE FROM article;
      DELETE FROM category;

      ALTER TABLE article_content ADD COLUMN thumbnail_url VARCHAR(255) NOT NULL DEFAULT '';
      ALTER TABLE article_content ADD COLUMN metadata JSON NOT NULL DEFAULT '{}'::JSON;
      ALTER TABLE article_content ADD COLUMN content TEXT NOT NULL DEFAULT '';
      ALTER TABLE article ADD COLUMN slug VARCHAR(100) NOT NULL;
      
      CREATE UNIQUE INDEX article_slug_idx 
        ON article (slug);

      ALTER TABLE category ADD COLUMN published BOOLEAN DEFAULT FALSE;
      ALTER TABLE category ADD COLUMN published_at TIMESTAMP;
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE article_content DROP COLUMN IF EXISTS thumbnail_url;
      ALTER TABLE article_content DROP COLUMN IF EXISTS metadata;
      ALTER TABLE article_content DROP COLUMN IF EXISTS content;
      ALTER TABLE article DROP COLUMN IF EXISTS slug;

      DROP INDEX IF EXISTS article_slug_idx;

      ALTER TABLE category DROP COLUMN IF EXISTS published;
      ALTER TABLE category DROP COLUMN IF EXISTS published_at;
    `)
  }
}
