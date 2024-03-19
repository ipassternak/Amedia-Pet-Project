import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateArticleCategories1710862756951 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE category (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE category_name (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        category_id UUID NOT NULL,
        name VARCHAR(100) NOT NULL,
        language VARCHAR(5) NOT NULL
      );

      ALTER TABLE category_name ADD CONSTRAINT fk_category_name_category_id
        FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE;

      CREATE UNIQUE INDEX idx_category_name_category_id_language
        ON category_name (category_id, language);

      ALTER TABLE article ADD COLUMN category_id UUID;

      ALTER TABLE article ADD CONSTRAINT fk_article_category_id
        FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE SET NULL;
    `)
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_category_name_category_id_language;
      DROP TABLE IF EXISTS category_name;
      DROP TABLE IF EXISTS category;
      ALTER TABLE article DROP CONSTRAINT fk_article_category_id;
      ALTER TABLE article DROP COLUMN category_id;
    `)
  }
}
