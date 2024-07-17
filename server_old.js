const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000;
app.use(function (req, res, next) {
  next();
});

app.all('/img/', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.all('/js/', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});

app.all('/css/', (req, res) => {
  res.status(404).send('<h1>404! Page not found</h1>');
});


app.use('/', express.static(__dirname + '/dist'));


app.listen(port, () => {
  console.log(`DDS Admin is listening at http://localhost:${port}`);
});