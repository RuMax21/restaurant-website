import { Router } from 'express';
import ClientRoutes from '../modules/client/client.routes';
import CategoryRoutes from '../modules/category/category.routes';
import ReservationRoutes from '../modules/reservation/reservation.routes';
import TableRoutes from '../modules/table/table.routes';
import DishRoutes from '../modules/dish/dish.routes';
import AdminRoutes from "../modules/admin/admin.routes";

const router: Router = Router();

router.use('/client', ClientRoutes);
router.use('/category', CategoryRoutes);
router.use('/reservation', ReservationRoutes);
router.use('/table', TableRoutes);
router.use('/dish', DishRoutes);
router.use('/admin', AdminRoutes);

export default router;
