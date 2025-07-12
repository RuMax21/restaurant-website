import { Router } from 'express';
import ClientRoutes from "../modules/client/client.routes";
import CategoryRoutes from "../modules/category/category.routes";

const router: Router = Router();

router.use("/client", ClientRoutes);
router.use("/category", CategoryRoutes);

export default router;