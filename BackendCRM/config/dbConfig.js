const mysql = require('mysql2');
const dotenv = require('dotenv');
const sequelize = require('sequelize')

// Memuat variabel lingkungan dari .env
dotenv.config();


const dbConfig = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    database: 'cms',
    user: process.env.USER,  // Menggunakan variabel lingkungan dengan fallback
});

// Menghubungkan ke database
dbConfig.connect((error) => {
    if (error) {
        console.error('Database connection failed:', error.stack);
        return; // Menghentikan eksekusi jika terjadi kesalahan
    }
    console.log('Database connected successfully');
});

module.exports = dbConfig;
