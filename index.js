const process = require('process');
const express = require('express');

const port = process.env.PORT ? process.env.PORT : 80;

const app = express();

app.get('/api', (request, response) => {
  response.json({
    shukkoku: 1565944200000,
    touchaku: 1567400400000,
    genzai: new Date().getTime(),
    start: 1564592400000
  });
});

app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Server started and listening at port ${port}...`);
});
