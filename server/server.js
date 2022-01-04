const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./db/connectDB");

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

//config
dotenv.config({ path: "server/config/config.env" });

const port = process.env.PORT || 3000;

connectDB(process.env.MONGO_URL);

const server = app.listen(port, () => console.log(`Server running on ${port}`));
// const start = () => {
//     try {
//     } catch (error) {
//         console.log(error);
//     }
// }
// start()

//Unhandled Promise Rejections
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
