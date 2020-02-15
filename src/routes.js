import { Router } from 'express';
import auth from './app/middleware/auth';

// Controllers
import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';

const routes = new Router();

/**
 * Public Routes
 */
routes.post('/sessions', SessionController.store);

/**
 * Private Routes
 */
routes.use(auth);

// Recipients
routes.post('/recipients', RecipientController.store);
routes.get('/recipients', RecipientController.index);
routes.get('/recipients/:id', RecipientController.show);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
