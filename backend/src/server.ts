import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectToDatabase } from './database/db.ts';
import userRoutes from "./routes/user.routes.ts";


const app = express();
const PORT  = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

connectToDatabase(); // Connect to the database before starting the server

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});