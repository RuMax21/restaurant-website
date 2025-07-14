import { PrismaClient } from '@prisma/client';
import {TableDto} from "./table.dto";
import {ApiError} from "../../exception/api-errors.exception";

export class TableService {
    private table = new PrismaClient().tables;

    public async getAllTables(): Promise<TableDto[]> {
        return (await this.table.findMany());
    }

    public async getAllAvailableTables(): Promise<TableDto[]> {
        return (await this.table.findMany({
            where: { isAvailable: true },
        }));
    }

    public async checkTableAvailability(id: number): Promise<boolean> {
        const findTable: TableDto | null = await this.table.findUnique({
           where: { id }
        });

        if (!findTable) throw ApiError.NotFound(`No table found with id ${id}`);

        return findTable.isAvailable;
    }

    public async createTable(data: TableDto): Promise<TableDto> {
        const existingTable = await this.table.findUnique({
            where: { number: data.number },
        })

        if (existingTable) throw ApiError.Conflict(`Table with number ${existingTable} already exists`);

        return (await this.table.create({ data }));
    }

    public async updateTable(id: number, data: TableDto): Promise<TableDto> {
        const table = await this.table.findUnique({
            where: { id },
        });
        if (!table) throw ApiError.NotFound(`Table with ID ${id} not found`);

        return (await this.table.update({
            where: { id },
            data
        }));
    }

    public async deleteTable(id: number): Promise<TableDto> {
        const table = await this.table.findUnique({
            where: { id },
        });
        if (!table) throw ApiError.NotFound(`Table with ID ${id} not found`);

        const reservationsCheck = await this.table.findUnique({
            where: { id },
            include: { Reservations: true },
        });

        if (reservationsCheck?.Reservations.length) throw ApiError.Conflict(
            `Cannot remove table with active reservations`
        );

        return (await this.table.delete({
            where: { id },
        }));
    }
}