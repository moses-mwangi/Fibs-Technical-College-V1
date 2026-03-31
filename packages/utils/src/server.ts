import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';

export function createExpressServer() {
  const app = express();
  
  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(compression());
  app.use(express.json());
  
  // Health check endpoint
  app.get('/health', (req: express.Request, res: express.Response) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });
  
  return app;
}
