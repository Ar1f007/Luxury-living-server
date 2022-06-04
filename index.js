require('dotenv').config();
const morgan = require('morgan');
const cors = require('cors');
const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const userRouter = require('./routes/userRoutes');

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.send('Hello from the server'));

app.use('/api/v1/users', userRouter);

const PORT = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log('Running at', PORT));
  } catch (error) {
    console.log(error);
  }
};

start();
