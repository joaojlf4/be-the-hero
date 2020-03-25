import knex from 'knex';
import knexConfig from '../../knexfile';

const dbInstance = knex(knexConfig.development);

module.exports = dbInstance;