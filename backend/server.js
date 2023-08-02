const app = require("./app");

//uncought expection
process.on("uncoughtExpection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`sutting down the server for handling uncought exeption`);
})

//config
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({
        path:"backend/config/.env"
    })
}

//create server
const server = app.litsen(process.env.PORT,() => {
    console.log(`server is runing on http://localhost:$process.eventNames.PORT`);
})

// unhandled promise rejetion
process.on("unhandledRejection", (err) => {
    console.log(`Shutting down the server for ${err.message}`);
    console.log(`shutting down the server for unhandle promise rejection`);
  
    server.close(() => {
      process.exit(1);
    });
  });