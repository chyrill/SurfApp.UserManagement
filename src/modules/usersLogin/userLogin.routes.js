import { Router } from 'express';

import * as userLoginController from './userLogin.controllers';

const routes = new Router();

routes.post('/signup', userLoginController.signUp);

export default routes;