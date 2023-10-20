const app = require('./app.js');

const PORT = 4000;
app.listen(PORT); 
console.clear();

console.log('Server on port',PORT);
//http

console.log(`http://localhost:${PORT}`)
