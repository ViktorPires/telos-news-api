require('dotenv').config();

module.exports = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_URL: process.env.DB_URL
}