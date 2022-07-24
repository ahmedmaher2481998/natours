//cleaning the terminal on start
console.clear();
const { application } = require('express');
const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
//use json middleware
app.use(express.json());
// app.get('/', (req, res) => {
//   res.status(200).json({ msg: 'this is from express ', app: 'natours2' });
//   res.end();
// });

// app.post('/', (req, res) => {
//   res.send('You can post o this endpoint now....');
// });
const toursEnpPint = '/api/1/tours';
const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

//get all tours
app.get(`${toursEnpPint}`, (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
});
//get tour by id
app.get(`${toursEnpPint}/:id`, (req, res) => {
  const id = +req.params.id;
  const requestedTour = tours.find((el) => el.id === id);
  if (!requestedTour) {
    res.status(404).json({
      status: 'Failed',
      message: 'Invalid Id...',
    });
  }
  res.json({
    status: 'success',
    data: requestedTour,
  });
});

//create new tour
app.post(`${toursEnpPint}`, (req, res) => {
  console.log(req);
  const newTour = {
    id: tours[tours.length - 1].id + 1,
    ...req.body,
  };
  tours.push(newTour);
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    if (err) console.log("Couldn't write to file...");
    res.status(201).json({
      status: 'success',
      data: newTour,
    });
  });
});
app.listen(port, () => {
  console.log('App running on port' + port);
});
