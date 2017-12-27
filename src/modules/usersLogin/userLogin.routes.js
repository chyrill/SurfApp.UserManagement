import { Router } from 'express';

import * as userLoginController from './userLogin.controllers';

const routes = new Router();

routes.post('/signup', userLoginController.signUp);
routes.post('/login',userLoginController.logIn);
routes.post('/authorize',userLoginController.authorize);

export default routes;
