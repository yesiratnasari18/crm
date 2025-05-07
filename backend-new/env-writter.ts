import fs from 'fs';
import path from 'path';

// Tentukan path untuk file .env
const dotenvFilePath = path.resolve(__dirname, '.env');

// Tentukan data variabel yang ingin dimasukkan ke dalam .env
const envVariables: { [key: string]: string } = {
  DB_NAME: 'cms',
  DB_HOST: 'localhost',
  DB_USER: 'root',
  DB_PASSWORD: '',
  PORT: '3000',
};

// Fungsi untuk menulis variabel ke dalam file .env
const writeEnvFile = (): void => {
  let envContent = '';
  for (const [key, value] of Object.entries(envVariables)) {
    envContent += `${key}=${value}\n`;
  }

  // Memeriksa apakah file .env sudah ada
  if (fs.existsSync(dotenvFilePath)) {
    console.log('.env file already exists, updating it...');
  } else {
    console.log('Creating new .env file...');
  }

  // Menulis variabel ke dalam file .env
  fs.writeFileSync(dotenvFilePath, envContent, 'utf8');
  console.log('.env file has been updated!');
};

// Jalankan fungsi untuk menulis file .env
writeEnvFile();
