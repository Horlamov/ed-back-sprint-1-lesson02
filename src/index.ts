import express from 'express';
import { setupApp } from './setup-app.js';

export const app = express();
setupApp(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST = '0.0.0.0'

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on port ${HOST}:${PORT}`);
  });
}

// Для Vercel + сохранение { app } для тестов
// @ts-ignore
module.exports = app;
// @ts-ignore
module.exports.app = app;


//