import express from 'express';

const app = express();

app.use((req, res) => {
  res.end('<h1>Hello epta!</h1>');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server listening on: ${PORT}`);
});