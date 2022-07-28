//star the server
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD).replace(
  '<USER>',
  process.env.DB_USER
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then((con) => {
    console.log(con);
  })
  .catch((err) => {
    console.error(err);
  });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  //eslint-disable-next-line
  console.log('\x1b[35m', `App running on port ${port}...`);
});
