import {Request, Response, NextFunction} from "express";
import {ReservationService} from "./reservation.service";
import {ReservationCreateDto, ReservationDto} from "./reservation.dto";
import {StatusCodes} from "http-status-codes";

class ReservationController {
    private reservationService: ReservationService = new ReservationService();

    public getAllReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const reservations: ReservationDto[] = await this.reservationService.getAllReservations();
            res.status(StatusCodes.OK).json(reservations);
        } catch (error) {
            next(error);
        }
    }

    public createReservation = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: ReservationCreateDto = req.body;
            const reservation: ReservationDto = await this.reservationService.createReservation(data);

            res.status(StatusCodes.CREATED).json(reservation);
        } catch (error) {
            next(error);
        }
    }
}

export default new ReservationController();