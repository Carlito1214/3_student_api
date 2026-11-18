import 'dotenv/config';
import express from 'express';
import studentRoutes from './routes/studentRoutes.ts';
import {pool} from './db.ts';

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Student Information API", course: "ITE 303" });
});

app.use('/students', studentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

pool.query('SELECT NOW()')
  .then(() => console.log('Database connected successfully'))
  .catch(() => console.error('Database connection failed. Check .env, Supabase, and your network.'));

const PORT = Number(process.env.PORT) || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
