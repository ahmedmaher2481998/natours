const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'this is from express', app: 'natours' });
  res.end();
});

app.app.listen(port, () => {
  let a = 2;
  console.log('App running on port' + port);
});
