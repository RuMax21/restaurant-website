import { PrismaClient } from '@prisma/client';
import { ClientDto } from './client.dto';
import { throwIfNotFound, throwIfExist } from '../../utils/db.utils';

export class ClientService {
    private client = new PrismaClient().clients;

    public async getClientById(id: number): Promise<ClientDto> {
        return (await throwIfNotFound(
            this.client.findUnique({
                where: { id },
            }),
            `The client with ID ${id} doesn't exist`,
        )) as ClientDto;
    }

    public async getAllClients(): Promise<ClientDto[]> {
        return (await this.client.findMany()) as ClientDto[];
    }

    public async createClient(data: ClientDto): Promise<ClientDto> {
        await throwIfExist(
            this.client.findFirst({
                where: { OR: [{ phone: data.phone }, { email: data.email }] },
            }),
            `A client with this phone or email already exist`,
        );

        return (await this.client.create({ data })) as ClientDto;
    }
}
