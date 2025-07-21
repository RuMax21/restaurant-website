import { PrismaClient } from '@prisma/client';
import { TableDto } from './table.dto';
import { ApiError } from '../../exception/api-errors.exception';
import { throwIfExist, throwIfNotFound } from '../../utils/db.utils';

export class TableService {
    private table = new PrismaClient().tables;

    public async getAllTables(): Promise<TableDto[]> {
        return (await this.table.findMany()) as TableDto[];
    }

    public async getAllAvailableTables(): Promise<TableDto[]> {
        return (await this.table.findMany({
            where: { isAvailable: true },
        })) as TableDto[];
    }

    public async checkTableAvailability(id: number): Promise<boolean> {
        const findTable = (await throwIfNotFound(
            this.table.findUnique({ where: { id } }),
            `No table found with id ${id}`,
        )) as TableDto;

        return findTable.isAvailable;
    }

    public async createTable(data: TableDto): Promise<TableDto> {
        await throwIfExist(
            this.table.findUnique({
                where: { number: data.number },
            }),
            `Table with number ${data.number} already exists`,
        );

        return (await this.table.create({ data })) as TableDto;
    }

    public async updateTable(id: number, data: TableDto): Promise<TableDto> {
        await throwIfNotFound(
            this.table.findUnique({
                where: { id },
            }),
            `Table with ID ${id} not found`,
        );

        return (await this.table.update({
            where: { id },
            data,
        })) as TableDto;
    }

    public async deleteTable(id: number): Promise<TableDto> {
        await throwIfNotFound(
            this.table.findUnique({
                where: { id },
            }),
            `Table with ID ${id} not found`,
        );

        const reservationsCheck = await this.table.findUnique({
            where: { id },
            include: { Reservations: true },
        });

        if (reservationsCheck?.Reservations.length)
            throw ApiError.Conflict(
                `Cannot remove table with active reservations`,
            );

        return (await this.table.delete({
            where: { id },
        })) as TableDto;
    }
}
