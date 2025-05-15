import express from 'express';
import dotenv from 'dotenv';
import apiRoute from './src/routes/api';

console.log(process.env.DB_NAME);
// Load environment variables from .env file
dotenv.config();

// Initialize app
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.use('/api', apiRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
