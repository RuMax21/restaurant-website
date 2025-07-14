import { PrismaClient } from '@prisma/client';
import { ClientDto } from "./client.dto";
import { ApiError } from "../../exception/api-errors.exception";

export class ClientService {
    private client = new PrismaClient().clients;

    public async getClientById(id: number): Promise<ClientDto> {
        const findClient: ClientDto | null = await this.client.findUnique({
            where: { id }
        });

        if (!findClient) throw ApiError.NotFound(`The client with ID "${id}" doesn't exist`);

        return findClient;
    }

    public async getAllClients(): Promise<ClientDto[]> {
        return (await this.client.findMany());
    }

    public async createClient(data: ClientDto): Promise<ClientDto> {
        const findClient: ClientDto | null = await this.client.findFirst({
            where: { OR: [
                { phone: data.phone },
                { email: data.email }
            ]}
        });
        if (findClient) throw ApiError.Conflict(`A client with this number or email already exist`);

        return (await this.client.create({ data }));
    }
}