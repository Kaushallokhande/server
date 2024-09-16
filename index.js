const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatroutes = require("./routes/chatroutes");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));


const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use((err, req, res, next) => {
  if (err.message.includes('GoogleGenerativeAIResponseError')) {
      console.error('Google AI Service Error:', err);
      res.status(500).json({ message: 'There was an error with the Google AI service. Please try again later.' });
  } else {
      console.error('Server Error:', err);
      res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
  }
});
app.use("/", chatroutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
