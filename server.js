//star the server
const app = require('./app');
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.clear();
  console.log('\x1b[35m', `App running on port ${port}...`);
});
