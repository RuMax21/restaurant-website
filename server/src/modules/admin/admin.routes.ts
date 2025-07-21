import { Router } from 'express';
import AdminController from './admin.controller';
import AdminValidator from './admin.validator';

const router: Router = Router();

router.post(
    '/register',
    AdminValidator.validateRegisterAdmin(),
    AdminController.registerAdmin,
);
router.post(
    '/login',
    AdminValidator.validateLoginAdmin(),
    AdminController.loginAdmin,
);

export default router;
