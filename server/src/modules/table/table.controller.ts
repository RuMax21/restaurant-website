import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from "http-status-codes";
import { TableDto } from "./table.dto";
import { TableService } from "./table.service";

class TableController {
    private tableService: TableService = new TableService();

    public getAllTable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tables: TableDto[] = await this.tableService.getAllTables();

            res.status(StatusCodes.OK).json(tables);
        } catch (error) {
            next(error);
        }
    }

    public getAllAvailableTables = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const tables: TableDto[] = await this.tableService.getAllAvailableTables();

            res.status(StatusCodes.OK).json(tables);
        } catch (error) {
            next(error);
        }
    }

    public checkTableAvailability = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const isAvailable: boolean = await this.tableService.checkTableAvailability( Number(id) );

            res.status(StatusCodes.OK).json({
                available: isAvailable,
            });
        } catch (error) {
            next(error);
        }
    }

    public createTable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: TableDto = req.body;
            const table: TableDto = await this.tableService.createTable(data);

            res.status(StatusCodes.CREATED).json(table);
        } catch (error) {
            next(error);
        }
    }

    public async updateTable(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;
            const data: TableDto = req.body;

            const updatedTable: TableDto = await this.tableService.updateTable( Number(id), data );

            res.status(StatusCodes.OK).json(updatedTable);
        } catch (error) {
            next(error);
        }
    }

    public deleteTable = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.params;
            const deletedTable: TableDto = await this.tableService.deleteTable( Number(id) );

            res.status(StatusCodes.OK).json(deletedTable);
        } catch (error) {
            next(error);
        }
    }
}

export default new TableController();