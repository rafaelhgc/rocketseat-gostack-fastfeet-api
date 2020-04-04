import dotenv from 'dotenv';

dotenv.config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,

  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
