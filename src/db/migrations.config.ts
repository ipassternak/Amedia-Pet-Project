import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'
import { SeederOptions } from 'typeorm-extension'

import { DatabaseNamingStrategy } from 'src/db/database-naming.strategy'

dotenv.config()

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  namingStrategy: new DatabaseNamingStrategy(),
  migrations: [`${__dirname}/../**/migrations/*{.js,.ts}`],
  entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
  seeds: [`${__dirname}/../**/seeds/*{.js,.ts}`],
}

export const dataSource = new DataSource(options)
