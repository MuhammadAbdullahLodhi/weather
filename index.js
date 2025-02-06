const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World1234!');
});
app.get('/login', (req, res) => {
  res.send('Hello World from Login!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});