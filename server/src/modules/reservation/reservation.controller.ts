import { Request, Response, NextFunction } from 'express';
import { ReservationService } from './reservation.service';
import {
    ReservationCreateDto,
    ReservationDto,
    ReservationUpdateDto,
} from './reservation.dto';
import { StatusCodes } from 'http-status-codes';
import { Status } from '@prisma/client';

class ReservationController {
    private reservationService: ReservationService = new ReservationService();

    public getAllReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const reservations: ReservationDto[] =
                await this.reservationService.getAllReservations();
            res.status(StatusCodes.OK).json(reservations);
        } catch (error) {
            next(error);
        }
    };

    public getReservationById = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const reservation: ReservationDto =
                await this.reservationService.getReservationById(Number(id));

            res.status(StatusCodes.OK).json(reservation);
        } catch (error) {
            next(error);
        }
    };

    public createReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const data: ReservationCreateDto = req.body;
            const reservation: ReservationDto =
                await this.reservationService.createReservation(data);

            res.status(StatusCodes.CREATED).json(reservation);
        } catch (error) {
            next(error);
        }
    };

    public updateReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const data: ReservationUpdateDto = req.body;
            const updatedReservation: ReservationDto =
                await this.reservationService.updateReservation(
                    Number(id),
                    data,
                );

            res.status(StatusCodes.OK).json(updatedReservation);
        } catch (error) {
            next(error);
        }
    };

    public updateStatusReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            const status: Status = req.body;
            const reservation: ReservationDto =
                await this.reservationService.updateStatusReservation(
                    Number(id),
                    status,
                );

            res.status(StatusCodes.OK).json(reservation);
        } catch (error) {
            next(error);
        }
    };

    public deleteReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const { id } = req.params;
            await this.reservationService.deleteReservation(Number(id));

            res.status(StatusCodes.NO_CONTENT).send();
        } catch (error) {
            next(error);
        }
    };

    public getUpcomingReservation = async (
        req: Request,
        res: Response,
        next: NextFunction,
    ): Promise<void> => {
        try {
            const reservations: ReservationDto[] =
                await this.reservationService.getUpcomingReservations();

            res.status(StatusCodes.OK).json(reservations);
        } catch (error) {
            next(error);
        }
    };
}

export default new ReservationController();
