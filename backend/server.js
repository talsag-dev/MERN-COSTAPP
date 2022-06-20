// importing the dependencies
const express = require ('express');
const cors = require('cors');
const connectDB = require("./config/db");
const path = require('path');


const usersRouter = require('./routes/users');
const costsRouter = require('./routes/costs');
const PORT = process.env.PORT
const app = express();



// Middlewares
// using bodyParser to parse JSON bodies into JS objects
app.use(express.json());

connectDB();

app.use('/users', usersRouter);
app.use('/costs', costsRouter);

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
  })
}

app.listen(PORT, () => {
  console.log(`Server running. Listening on port ${PORT}`);
});
