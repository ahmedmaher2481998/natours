//star the server
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });

const app = require('./app');

mongoose.connect();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('\x1b[35m', `App running on port ${port}...`);
});
