import "dotenv/config"; 

import app from "./src/app";
import { connectToDB } from "./src/config/database";
import { env } from "./src/config/env";

import "dotenv/config";


const startServer = async () => {

  await connectToDB();

  app.listen(env.PORT, () => {
    console.log(`Server running on http://localhost:${env.PORT}`);
    console.log(`Environment: ${env.NODE_ENV}`);
  });
};

startServer();


