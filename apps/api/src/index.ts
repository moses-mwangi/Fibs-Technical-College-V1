import { createExpressServer } from '@repo/utils/server';

const app = createExpressServer();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 API server running on port ${PORT}`);
});

export default app;
