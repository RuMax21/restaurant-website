import { Router } from 'express';
import ClientController from './client.controller';
import ClientValidator from './client.validator';

const router: Router = Router();

router.get(
    '/:id',
    ClientValidator.validateClientId(),
    ClientController.getClientById,
);
router.get('/', ClientController.getAllClients);
router.post(
    '/',
    ClientValidator.validateCreateClient(),
    ClientController.createClient,
);

export default router;
