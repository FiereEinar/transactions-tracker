import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
dotenv.config();

import connectToDB from './src/database/mongodb';
connectToDB();

import studentRouter from './src/routes/student';
import transactionRouter from './src/routes/transaction';
import categoryRouter from './src/routes/category';
import authRouter from './src/routes/auth';
import organizationRouter from './src/routes/organization';

import { notFoundHandler } from './src/middlewares/not-found';
import { errorHandler } from './src/middlewares/error';

const app = express();
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/student', studentRouter);
app.use('/transaction', transactionRouter);
app.use('/category', categoryRouter);
app.use('/auth', authRouter);
app.use('/organization', organizationRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(3000, () => console.log('Server is running on PORT 3000'));

export default app;
