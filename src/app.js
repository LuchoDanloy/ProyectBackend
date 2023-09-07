import dotenv from "dotenv";

dotenv.config();


import AppFactory from "./presentation/factories/appFactory.js";
import DbFactory from "./data/factories/dbFactory.js";
import CronJob from "./utils/cron.js";

void (async() =>
{

      const db = DbFactory.create(process.env.DB);
      db.init(process.env.DB_URI);

      const app = AppFactory.create();

      app.init();
      app.build();
      
      // Inicia la tarea cron utilizando la clase
      const cronJob = new CronJob();
      cronJob.start();

      app.listen();

})();


    
