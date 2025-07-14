import { Request, Response, NextFunction } from 'express';
import { ClientService } from "./client.service";
import {ClientDto} from "./client.dto";
import { StatusCodes } from "http-status-codes";

class ClientController {
    private clientService: ClientService = new ClientService();

    public getClientById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const client: ClientDto = await this.clientService.getClientById( Number(id) );

            res.status(StatusCodes.OK).json(client);
        } catch (error) {
            next(error);
        }
    }

    public getAllClients = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const clients: ClientDto[] = await this.clientService.getAllClients();

            res.status(StatusCodes.OK).json(clients);
        } catch (error) {
            next(error);
        }
    }

    public createClient = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: ClientDto = req.body;
            const client: ClientDto = await this.clientService.createClient(data);

            res.status(StatusCodes.CREATED).json(client);
        } catch (error) {
            next(error);
        }
    }
}

export default new ClientController();