import express , { Express } from "express";
import colors from "colors";
import router from "./routes";
import db from "./config/db";

export const server : Express = express();

//Conexion a la base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    // console.log(colors.blue.bold("Connection has been established successfully."));
  } catch (error) {
    console.log(colors.red.bold.bgWhite("Unable to connect to the database"))
    // process.exit(1);
  }
}
connectDB();

// Habilitar entrada de datos
server.use(express.json());

// Routing
server.use("/api/products",router);

server.get("/api",(req,res) => {
  res.json({
    msg: "Welcome to the API"
  })
})