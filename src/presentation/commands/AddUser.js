import { Command } from 'commander';
import UserManager from '../../domine/managers/userManager.js'
import { createHash } from "../../utils/index.js";

const AddUserCommand = new Command('addUser');

AddUserCommand
  .version('0.0.1')
  .description('Add user')

  .option('-fn, --firstName <firstName>', 'User`s first name')
  .option('-ln, --lastName <lastName>', 'User`s last name')
  .option('-e, --email <email>', 'User`s email')
  .option('-a, --age <age>', 'User`s age')
  .option('-p, --password <password>', 'User`s password')
  .option('-ia, --isAdmin <isAdmin>', 'User`s isAdmin')
  .action(async(env) =>
  {
    const payload = {
      ...env,
      age: +env.age,
      isAdmin: env.isAdmin === 'true',
      password: await createHash(env.password, 10)
    };

    const manager = new UserManager();
    const user = await manager.create(payload);

    if(user)
    {
       console.log('User created successfully');
    }
  });

export default AddUserCommand;
