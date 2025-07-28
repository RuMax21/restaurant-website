import { Router } from 'express';
import ReservationController from './reservation.controller';
import ReservationValidator from './reservation.validator';
import { authAdminMiddleware } from '../../middlewares/auth.middleware';

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
    authAdminMiddleware,
    ReservationValidator.validateCreateReservation(),
    ReservationController.createReservation,
);
router.put(
    '/:id',
    authAdminMiddleware,
    ReservationValidator.validateUpdateReservation(),
    ReservationController.updateReservation,
);
router.delete(
    '/:id',
    authAdminMiddleware,
    ReservationValidator.validateReservationId(),
    ReservationController.deleteReservation,
);
router.put(
    '/:id/status',
    authAdminMiddleware,
    ReservationValidator.validateReservationId(),
    ReservationController.updateStatusReservation,
);
router.get(
    '/schedule/:date',
    authAdminMiddleware,
    // TODO: here should be validation for date
    ReservationController.getReservationsByDate,
);

export default router;
