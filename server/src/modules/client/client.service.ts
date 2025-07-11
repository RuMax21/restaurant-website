import { PrismaClient } from '@prisma/client';
import { ClientCreateDto } from "./client.dto";

const prisma = new PrismaClient();

class ClientService {
    async getClientById(id: number) {
        return prisma.clients.findUnique({
            where: {id}
        })
    }

    async getAllClients() {
        return prisma.clients.findMany();
    }

    async createClient(data: ClientCreateDto) {
        return prisma.clients.create({ data });
    }
}

export default new ClientService();