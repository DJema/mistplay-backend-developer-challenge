const express = require('express');
const bodyParser = require('body-parser');
const games = require('./routes/games.route');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/games', games);

let port = 3000;

app.listen(port, () => {
    console.log('Server started on port number ' + port);
});