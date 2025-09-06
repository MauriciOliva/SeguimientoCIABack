import { initServer } from "./config/app.js";
import { config } from "dotenv";
import { connect } from "./config/mongo.js";
import "./src/Agenda/notifier.js"

config();
connect();
initServer();