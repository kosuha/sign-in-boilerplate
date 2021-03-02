const express = require('express');
const app = express();
const port = 80;

app.get('/', (request, response) => {
    response.send('hello react!');
});

app.listen(port, () => {
    console.log(`app start! port: ${port}`);
});