import { Router } from 'express';
import TablesController from "./table.controller";
import TableValidator from "./table.validator";

const router: Router = Router();

router.get('/', TablesController.getAllTable);
router.get('/available', TablesController.getAllAvailableTables);
router.get('/available/:id', TableValidator.validateTableId(), TablesController.checkTableAvailability);
router.post('/', TableValidator.validateCreateTable(), TablesController.createTable);
router.put('/:id', TableValidator.validateUpdateTable(), TablesController.updateTable);
router.delete('/:id', TableValidator.validateTableId(), TablesController.deleteTable);

export default router;