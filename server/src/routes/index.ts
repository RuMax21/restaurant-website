import { Router } from 'express';
import ClientRoutes from "../modules/client/client.routes";

const router: Router = Router();

router.use("/client", ClientRoutes);

export default router;