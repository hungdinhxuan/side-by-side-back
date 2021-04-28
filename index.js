const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000
const mongoose = require("mongoose")
const routes = require("./routes/index.js")

app.use(express.urlencoded({ extended: true }))

const connectDB = async () => {
  await mongoose.connect("mongodb+srv://admin:admin@cluster0.rrcyu.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
  console.log('Connect to database successfully')
}
connectDB()

routes(app)

app.listen(PORT);
