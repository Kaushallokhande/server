const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const chatroutes = require("./routes/chatroutes");
const mongoose = require("mongoose");

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/", chatroutes);

const PORT = process.env.PORT || 5050;

app.listen(PORT, () => console.log(`Server on port: ${PORT}`));
