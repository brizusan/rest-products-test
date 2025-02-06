import express , { Express } from "express";
import cors , {CorsOptions} from "cors";
import morgan from "morgan";
import colors from "colors";
import router from "./routes";
import db from "./config/db";

export const server : Express = express();

//Conexion a la base de datos
export async function connectDB() {
  try {
    await db.authenticate();
    db.sync();
    console.log(colors.blue.bold("Connection has been established successfully."));
  } catch (error) {
    console.log(colors.red.bold.bgWhite("Unable to connect to the database"))
    process.exit(1);
  }
}
connectDB();

// Habilitar entrada de datos
server.use(express.json());

// Habilitar cors

const allowedOrigins = [process.env.FRONTEND_URL];

if(process.argv[2] === '--postman'){
  allowedOrigins.push(undefined)
}

const corsOptions : CorsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('No permitido por CORS'))
    }
  }
}

server.use(cors(corsOptions));
// Habilitar morgan
server.use(morgan("dev"));

// Routing
server.use("/api/products",router);
