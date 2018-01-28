import { Router } from 'express';
import * as UserInfoController from './userinfo.controller';


const routes = new Router();

routes.get('', UserInfoController.searchAll);

export default routes;