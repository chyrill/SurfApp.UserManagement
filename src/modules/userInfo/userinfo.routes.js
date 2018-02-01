import { Router } from 'express';
import * as UserInfoController from './userinfo.controller';


const routes = new Router();

routes.get('', UserInfoController.searchAll);
routes.post('/setcontactid', UserInfoController.setContactId);

export default routes;