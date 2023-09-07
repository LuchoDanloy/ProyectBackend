import UserManager from '../domine/managers/userManager.js'
import cron from 'node-cron'

class CronJob {

  start() {


    var task = cron.schedule('0 0 * * *', async () => {
      // Esta tarea se ejecutará todos los días a medianoche (0:00)
    
      try {
        //Encuentra y elimina los usuarios que no se han conectado en los últimos 20 días o más
        const manager = new UserManager()
        await manager.deleteOldUsers()
        console.log("Cron funcionando")

      } catch (error) {
        console.error('Error al eliminar usuarios inactivos:', error);
      }
    });

    // Inicia la tarea cron
    task.start();
  }
}

export default CronJob;
