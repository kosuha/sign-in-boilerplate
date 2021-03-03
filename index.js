const express = require('express');
const app = express();
const port = 80;

const conn = require('./conn/mongooseConnect.js');
const mongoose = require('mongoose');
mongoose.connect(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => console.log('mongoDB Connected!'))
    .catch(error => console.log(error));

app.get('/', (request, response) => {
    response.send('hello react!');
});

app.listen(port, () => {
    console.log(`app start! port: ${port}`);
});