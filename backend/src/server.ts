import app from './infra/http/app';

const PORT = Number(process.env.PORT) || 3333;
const HOST = process.env.HOST || '0.0.0.0';

app.listen(PORT, HOST, () => {
  console.log(`Server up on port ${PORT}`);
});

process.on('SIGINT', () => {
  process.exit();
});
