require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const Router = require('./routes/participantsRoutes');

// middlewares
app.use(cors());
app.use(express.json());
app.use('/api/', Router);

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log('Connected to DB');
  app.listen(PORT, () =>
    console.log(`Server is running on http://localhost:${PORT}`)
  );
});
