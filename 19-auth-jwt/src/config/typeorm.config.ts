import { TypeOrmModuleOptions }  from '@nestjs/typeorm';

const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'password123',
    database: 'nest_training_app',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
    migrations: ['src/migration/*.ts'],
    cli: {
        'migrationsDir': 'src/migration'
    }
}

module.exports = typeOrmConfig