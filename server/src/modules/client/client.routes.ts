import { Router } from 'express';
import ClientController from './client.controller';
import ClientValidator from './client.validator';
import { authAdminMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.get(
    '/:id',
    ClientValidator.validateClientId(),
    ClientController.getClientById,
);
router.get('/', authAdminMiddleware, ClientController.getAllClients);
router.post(
    '/',
    ClientValidator.validateCreateClient(),
    ClientController.createClient,
);

export default router;
