import express from 'express';
import data from './data/data';

const app = express();
const PORT = 3000;

// for public folder on path /
app.use(express.static('public'));

// for images folder on path /images
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  res.json(data);
});

app.post('/newItem', (req, res) => {
  res.send(`A post request has been sent to /newItem route on port ${PORT}`);
});

app.put('/item', (req, res) => {
  res.send(`A put request with /item route on port ${PORT}`);
});

app.delete('/item', (req, res) => {
  res.send(`A delete request with /item route on port ${PORT}`);
});

app.listen(PORT, () => {
  console.log(`Listening on the quiet storm... *${PORT}`);
  // console.log('data ->', data);
});
