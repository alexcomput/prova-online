import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import acl from './acl';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentsController from './app/controllers/AppointmentsController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvailableController from './app/controllers/AvailableController';

import autMideware from './app/middewares/auth';

import ExamController from './app/controllers/ExamController';
import GroupQuestionController from './app/controllers/GroupQuestionController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(autMideware);

routes.use(acl.authorize);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);
routes.get('/providers/:providerId/available', AvailableController.index);

routes.post('/files', upload.single('file'), FileController.store);

routes.post('/appointments', AppointmentsController.store);
routes.get('/appointments', AppointmentsController.index);
routes.delete('/appointments/:id', AppointmentsController.delete);

routes.get('/schedule', ScheduleController.index);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/exam', ExamController.index);
routes.post('/exam', ExamController.store);
routes.put('/exam', ExamController.update);

routes.get('/group-question', GroupQuestionController.index);
routes.post('/group-question', GroupQuestionController.store);
routes.put('/group-question', GroupQuestionController.update);

export default routes;
