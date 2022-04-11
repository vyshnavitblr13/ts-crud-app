import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connectToDatabase } from "./src/services/database.service"
import { usersRouter } from "./src/router/users.routes"

const app = express();
app.use(express.json());

// var corsOptions = {
//     origin : "http://localhost:5000"
// };

app.use(cors())

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
 }
 
 const PORT: number = parseInt(process.env.PORT as string);
 
 
  connectToDatabase()
    .then(() => {
       
        app.use("/api",usersRouter)
        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT}`);
        });
    }) 
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    }); 

