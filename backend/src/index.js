import Config from "./config/Config.js";
import Database from "./db/Database.js";
import Server from "./server/Server.js";
import router from "./routes/routes.js";

Config.load();
const { PORT, HOST, DB_URI } = process.env;

const server = new Server(PORT, HOST, router);
const database = new Database(DB_URI);

try {
  database.connect();
} catch (e) {
  console.log("Failed to connect to database: " + e);
}

server.start();
