import { Router } from 'express';
import auth from '../middlewares/auth.js';
import { login, current, signup } from "../../presentation/controllers/sessionController.js";

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

export default sessionRouter;
