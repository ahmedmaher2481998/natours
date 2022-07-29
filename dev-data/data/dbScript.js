const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

const db =
  'mongodb+srv://amaher:u7Leacu5rW3G0U8c@cluster0.6joc2.mongodb.net/natours?retryWrites=true&w=majority';

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('Connecting to DB successfully');
  })
  .catch((err) => {
    console.error(err);
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data Imported Successfully');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data deleted successfully');
  } catch (error) {
    console.error(error);
  }
  process.exit();
};

if (process.argv[2] === '--del') {
  console.log(process.argv[2]);
  deleteData();
}

if (process.argv[2] === '--imp') {
  console.log(process.argv[2]);
  importData();
}
