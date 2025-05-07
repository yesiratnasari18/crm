import express from 'express';
import dotenv from 'dotenv';
import produkRoutes from './src/routes/produkRoutes';
import userRoutes from './src/routes/userRoutes';
import sektorRoutes from './src/routes/sektorRoutes';
import contactRoutes from './src/routes/contactRoutes';

console.log(process.env.DB_NAME);
// Load environment variables from .env file
dotenv.config();

// Initialize app
const app = express();

// Middleware to parse JSON request body
app.use(express.json());

app.use('/api', produkRoutes);
app.use('/api', userRoutes);
app.use('/api', sektorRoutes);
app.use('/api', contactRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
