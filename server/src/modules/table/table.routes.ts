import { Router } from 'express';
import TablesController from './table.controller';
import TableValidator from './table.validator';
import {authAdminMiddleware} from "../../middlewares/auth.middleware";

const router: Router = Router();

router.get('/', TablesController.getAllTable);
router.get('/available', TablesController.getAllAvailableTables);
router.get(
    '/available/:id',
    TableValidator.validateTableId(),
    TablesController.checkTableAvailability,
);
router.post(
    '/',
    authAdminMiddleware,
    TableValidator.validateCreateTable(),
    TablesController.createTable,
);
router.put(
    '/:id',
    authAdminMiddleware,
    TableValidator.validateUpdateTable(),
    TablesController.updateTable,
);
router.delete(
    '/:id',
    authAdminMiddleware,
    TableValidator.validateTableId(),
    TablesController.deleteTable,
);

export default router;
