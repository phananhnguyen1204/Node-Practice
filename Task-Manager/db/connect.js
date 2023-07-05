const mongoose = require("mongoose");

const connectionString =
  "mongodb+srv://phananh:phananhjackjack@task-manager-api.i4fqviy.mongodb.net/Task-Manager?retryWrites=true&w=majority";

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("CONNECTED TO THE DB"))
  .catch((err) => console.log(e.message));
