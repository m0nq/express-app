import express from 'express';
import favicon from 'serve-favicon';
import path from 'path';

import data from './data/data';

const app = express();
const PORT = 3000;

// for public folder on path /
app.use(express.static('public'));

// method to use json
// app.use(express.json());
app.use(express.urlencoded({extended: true}));

// This is for proxies
app.set('trust proxy', 'loopback');

// for images folder on path /images
app.use('/images', express.static('images'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.get('/', (req, res) => {
    res.json(data);
});

// JSON data
// {'hello': 'JSON is cool'}
// URLEncoded data
// hello=URLEncoded+is+cool
app.post('/newItem', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

app.get('/item/:id', (req, res, next) => {
    //  this is the middleware that pulls the data
    console.log(req.params.id);
    let userId = Number(req.params.id);
    console.log(userId);
    console.log(data[userId].email);
    // middleware that uses the request object
    console.log(`Request from: ${req.originalUrl}`);
    console.log(`Request type: ${req.method}`);
    // everything above is middleware
    res.send(data[userId]);
    next();
}, (req, res) => {
    console.log('Did you hit the correct endpoint?');
});

app.route('/item')
    .get((req, res) => {
        // return res.send(`a get request with /item route on port ${PORT}`);
        throw new Error();
    })
    .put((req, res) => res.send(`a put call has been made with /item route on port ${PORT}`))
    .delete((req, res) => res.send(`a delete call has been made with /item route on port ${PORT}`));

app.post('/item', (req, res) => {
    res.send(`A post request has been sent to /newItem route on port ${PORT}`);
});

// Error handling function
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500)
        .send(`Red alert! Red alert!: ${err.stack}`);
});

app.listen(PORT, () => {
    console.log(`Listening on the quiet storm... *:${PORT}`);
});
