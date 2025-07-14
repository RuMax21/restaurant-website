import { Router } from 'express';
import ReservationController from "./reservation.controller";

const router: Router = Router();

router.get('/', ReservationController.getAllReservation);
// router.get('/upcoming', ReservationController.getUpcomingReservation);
router.post('/', ReservationController.createReservation);
/*router.put('/:id/status', ReservationController.updateStatusReservation);
router.put('/:id', ReservationController.editReservation);
router.delete('/:id', ReservationController.deleteReservation);
router.get('/:id/dishes', ReservationController.getDishes);
router.post('/:id/dishes', ReservationController.addDish);
router.put('/:id/dishes', ReservationController.editDish);
router.delete('/:id/dishes', ReservationController.deleteDish);*/

export default router;