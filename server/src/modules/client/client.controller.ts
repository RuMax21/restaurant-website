import { Request, Response } from 'express';
import ClientService from "./client.service";
import {ClientCreateDto} from "./client.dto";

class ClientController {
    async getClient(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await ClientService.getClient( Number(id) );
            res.status(200).send(client);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async getAllClients(req: Request, res: Response) {
        try {
            const clients = await ClientService.getAllClients();
            res.status(200).send(clients);
        } catch (error) {
            res.status(500).send(error);
        }
    }

    async createClient(req: Request, res: Response) {
        try {
            const data: ClientCreateDto = req.body;
            const client = await ClientService.createClient( data );
            res.status(200).send(client);
        } catch (error) {
            res.status(500).send(error);
        }
    }
}

export default new ClientController();