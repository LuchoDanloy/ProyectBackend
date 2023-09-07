import UserManager from "./userManager.js";
import { isValidPassword, generateToken, createHash } from "../../utils/index.js";
import loginValidation from "../validations/session/loginValidation.js";
import userCreateValidation from "../validations/user/userCreateValidation.js";

class sessionManager{

    async login(email, password)
    {

        await loginValidation.parseAsync({ email, password });

        const manager = new UserManager();
        let user = await manager.getOneByEmail(email);
        const isHashedPassword = await isValidPassword(password, user.password);

        if (!isHashedPassword)
        {
            return res.status(401).send({ message: 'Login failed, invalid password.'})
        }
        
        //grabar el dia que inicio session
        user = await manager.updateOne(user.id,{lastDate: Date()})
        
        return await generateToken(user);
    }

    async signup(payload)
    {
      await userCreateValidation.parseAsync(payload);
  
      const dto = {
        ...payload,
        password: await createHash(payload.password, 10)
      }
  
      const manager = new UserManager();
      const user = await manager.create(dto);
      //const user  = await this.userDao.create(dto);
  
      return { ...user, password: undefined};
    }
}


export default sessionManager;