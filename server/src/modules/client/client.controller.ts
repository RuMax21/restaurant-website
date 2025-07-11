import { Request, Response } from 'express';
import ClientService from "./client.service";
import {ClientCreateDto} from "./client.dto";
import { StatusCodes } from "http-status-codes";

class ClientController {
    async getClientById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await ClientService.getClientById( Number(id) );

            if (!client) {
                return res.status(StatusCodes.NOT_FOUND).json({
                    message: 'Client not found'
                });
            }

            res.status(StatusCodes.OK).json({
                client
            })
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Couldn't find the client`,
            });
        }
    }

    async getAllClients(req: Request, res: Response) {
        try {
            const clients = await ClientService.getAllClients();
            res.status(StatusCodes.OK).json(clients);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Couldn't find clients`,
            });
        }
    }

    async createClient(req: Request, res: Response) {
        try {
            const data: ClientCreateDto = req.body;
            const client = await ClientService.createClient(data);
            res.status(StatusCodes.CREATED).json(client);
        } catch (error) {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                message: `Failed to create client`,
            });
        }
    }
}

export default new ClientController();