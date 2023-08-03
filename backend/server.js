const app = require("./app");
const connectDatabase = require("./db/Database");

//uncought expection
process.on("uncoughtExpection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`sutting down the server for handling uncought exeption`);
});

//config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env",
  });
}

// connect database
connectDatabase();

//create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
// unhandled promise rejetion
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down the server for ${err.message}`);
  console.log(`shutting down the server for unhandle promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});

module.exports = app;