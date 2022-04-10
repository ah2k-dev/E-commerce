const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
    //   useCreateIndex: true,
    //   useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`MongoDB connected with server:${data.connection.host}`);
    })
    .catch((err) => {
      console.log('errosssssssr',err);
    });
};

module.exports = connectDB;
