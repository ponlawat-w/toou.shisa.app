const process = require('process');
const express = require('express');

const port = process.env.PORT ? process.env.PORT : 80;

const app = express();

app.get('/api', (request, response) => {
  response.json({
    doku: 1585692000000,
    sei: 1598911200000,
    kikoku: 1617228000000,
    genzai: new Date().getTime(),
    start: 1567288800000
  });
});

app.use('/', express.static('public'));

app.listen(port, () => {
  console.log(`Server started and listening at port ${port}...`);
});
