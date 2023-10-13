const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connection is successfull");
  })
  .catch(() => {
    console.log("Connection is unsuccessful");
  });
