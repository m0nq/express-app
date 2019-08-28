import express from 'express';
import data from './data/data';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(PORT, () => {
  console.log(`Listening on the quiet storm... *${PORT}`);
  console.log('data ->', data);
});
