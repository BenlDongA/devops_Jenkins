import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import foodRoutes from './routes/foodRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// ================== Cấu hình ==================
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// ================== MongoDB ==================
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log(chalk.green.bold('✅ Kết nối MongoDB thành công!'));
  })
  .catch((err) => {
    console.log(chalk.red.bold('❌ Kết nối MongoDB thất bại:'), err);
  });

// ================== Routes ==================
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Server Running</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            text-align: center;
            background: #f9fafb;
            padding: 50px;
          }
          h1 {
            color: #2563eb;
          }
          p {
            color: #374151;
          }
          .box {
            display: inline-block;
            padding: 20px 40px;
            border: 2px solid #2563eb;
            border-radius: 12px;
            background: white;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          }
        </style>
      </head>
      <body>
        <div class="box">
          <h1>🚀 Server is running!</h1>
          <p>Đang chạy tại: <b>http://localhost:5000</b></p>
        </div>
      </body>
    </html>
  `);
});

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/orders', orderRoutes);

// ================== 404 handler ==================
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// ================== Server ==================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(chalk.green('===================================='));
  console.log(
    chalk.blue.bold(' 🚀 Server đang chạy tại: ') +
    chalk.yellow(`http://localhost:${PORT}`)
  );
  console.log(chalk.green('===================================='));
});
