import { Router } from 'express';

import * as companyController from './company.controller';

const routes = new Router();

routes.post('/create', companyController.create);


export default routes;