import { Router } from 'express';
import auth from './app/middleware/auth';

// Controllers
import SessionController from './app/controllers/SessionController';

const routes = new Router();

/**
 * Public Routes
 */
routes.post('/sessions', SessionController.store);

/**
 * Private Routes
 */

export default routes;
