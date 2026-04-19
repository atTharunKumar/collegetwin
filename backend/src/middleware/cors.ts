import cors from 'cors';

const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3000';

export const corsMiddleware = cors({
  origin: corsOrigin.split(',').map(origin => origin.trim()),
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});
