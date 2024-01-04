module.exports = {
  HOST: process.env.DB_HOST || 'localhost1',
  USER: process.env.DB_USER || 'root1',
  PASSWORD: process.env.DB_PASSWORD || '1',
  DB: process.env.DB_DATABASE || 'aero1',
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
