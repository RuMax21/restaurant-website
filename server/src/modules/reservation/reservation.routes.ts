import { Router } from 'express';
import ReservationController from './reservation.controller';
import ReservationValidator from './reservation.validator';

const router: Router = Router();

router.get('/', ReservationController.getAllReservation);
router.get(
    '/:id',
    ReservationValidator.validateReservationId(),
    ReservationController.getReservationById,
);
router.get('/upcoming', ReservationController.getUpcomingReservation);
router.post(
    '/',
    ReservationValidator.validateCreateReservation(),
    ReservationController.createReservation,
);
router.put(
    '/:id',
    ReservationValidator.validateUpdateReservation(),
    ReservationController.updateReservation,
);
router.delete(
    '/:id',
    ReservationValidator.validateReservationId(),
    ReservationController.deleteReservation,
);
router.put(
    '/:id/status',
    ReservationValidator.validateReservationId(),
    ReservationController.updateStatusReservation,
);

export default router;
