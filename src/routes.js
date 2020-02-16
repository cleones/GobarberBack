import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import AuthController from './app/controllers/AuthController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import auth from './app/middleware/auth';
import AvailableController from './app/controllers/AvailableController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/users', UserController.store);
routes.put('/users', auth, UserController.update);
routes.post('/login', AuthController.store);

routes.post('/files', auth, upload.single('file'), FileController.store);

routes.get('/providers', auth, ProviderController.index);
routes.get('/providers/:providerId/available', auth, AvailableController.index);

routes.post('/appointments', auth, AppointmentController.store);
routes.get('/appointments', auth, AppointmentController.index);
routes.delete('/appointments/:id', auth, AppointmentController.delete);

routes.get('/schedules', auth, ScheduleController.index);
routes.get('/notifications', auth, NotificationController.index);
routes.put('/notifications/:id', auth, NotificationController.update);
export default routes;
