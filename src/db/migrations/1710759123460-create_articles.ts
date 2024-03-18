import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateArticles1710759123460 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE article (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        published BOOLEAN DEFAULT FALSE,
        published_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE article_content (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        article_id UUID NOT NULL,
        title VARCHAR(100) NOT NULL,
        description VARCHAR(2000) NOT NULL,
        language VARCHAR(5) NOT NULL
      );

      ALTER TABLE article_content ADD CONSTRAINT fk_article_content_article_id
        FOREIGN KEY (article_id) REFERENCES article (id) ON DELETE CASCADE;

      CREATE UNIQUE INDEX idx_article_content_article_id_language
        ON article_content (article_id, language);
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_article_content_article_id_language;
      DROP TABLE IF EXISTS article_content;
      DROP TABLE IF EXISTS article;
    `)
  }
}
