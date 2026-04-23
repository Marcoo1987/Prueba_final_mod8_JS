const { Sequelize } = require('sequelize');
const envConfigs = require('./env');
const sequelize = new Sequelize(
  envConfigs.processEnv.DB_NAME,
  envConfigs.processEnv.DB_USER,
  envConfigs.processEnv.DB_PASS,
  {
    host: envConfigs.processEnv.DB_HOST,
    port: envConfigs.processEnv.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✔ Conexión a DB establecida con éxito.');
  } catch (error) {
    console.error('❌ Error de conexión a DB:', error);
  }
};
module.exports = { sequelize, testConnection };
