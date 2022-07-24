const { application } = require('express');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
//use json middleware
application.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ msg: 'this is from express ', app: 'natours2' });
//   res.end();
// });

// app.post('/', (req, res) => {
//   res.send('You can post o this endpoint now....');
// });
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));
app.get('/api/1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});

app.post('/api/1/tours', (req, res) => {
  console.log(req.body);
  const newTour = {
    id: tours[tours.length - 1].id + 1,
    ...req.body,
  };
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) console.log("Couldn't write to file...");
    res.json({
      status: 'success',
      data: newTour,
    });
  });
});
app.listen(port, () => {
  console.log('App running on port' + port);
});
