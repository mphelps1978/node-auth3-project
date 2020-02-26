require('dotenv').config({
  path:'./config'
});
const server = require('./api/server.js');

const port = process.env.PORT || 5000

server.listen(port, () => {
  console.log(`\n***All your bases are belong to us. ${port}***\n`);
})