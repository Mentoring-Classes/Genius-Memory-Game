import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routes from './routes';
import loggerMiddleware from './middlewares/logger';
import logger from './utils/logger';
import cors from 'cors';
import setupSwagger from './utils/swagger';

dotenv.config();
const app = express();

// Configuração de CORS baseada em variáveis de ambiente
const allowedOrigins = process.env.CORS_ORIGINS
	? process.env.CORS_ORIGINS.split(',')
	: ['http://localhost:3000', 'https://danielobara.github.io'];

app.use(express.json());
app.use(
	cors({
		origin: (origin, callback) => {
			// Permitir requisições sem origem (como mobile apps ou ferramentas como Postman)
			if (!origin) return callback(null, true);

			if (
				allowedOrigins.includes(origin) ||
				allowedOrigins.some((allowed) => origin.startsWith(allowed))
			) {
				callback(null, true);
			} else {
				logger.warn(`CORS blocked request from origin: ${origin}`);
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
	}),
);
app.use(loggerMiddleware);
setupSwagger(app);
app.use(routes);

const PORT = process.env.PORT || 3000;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose
	.connect(
		`mongodb+srv://${dbUser}:${dbPassword}@backend.k11ic.mongodb.net/?retryWrites=true&w=majority&appName=Backend`,
	)
	.then(() => {
		logger.info('Connected to MongoDB');
	})
	.catch((err) => {
		logger.error('Failed to connect to MongoDB:', err);
	});

app.listen(PORT, () => {
	logger.info(
		`Server listening on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`,
	);
});
