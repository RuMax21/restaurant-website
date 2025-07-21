import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { AdminService } from "./admin.service";
import {AdminDto, AdminRegisterDto, AdminLoginDto} from "./admin.dto";

class AdminController {
    private adminService: AdminService = new AdminService();

    public registerAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: AdminRegisterDto = req.body;
            const admin: AdminDto = await this.adminService.registerAdmin(data);

            res.status(StatusCodes.CREATED).json(admin);
        } catch (error) {
            next(error);
        }
    }

    public loginAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data: AdminLoginDto = req.body;
            const loggedInAdmin: { token: string, admin: AdminDto } = await this.adminService.loginAdmin(data);

            res.status(StatusCodes.OK).json(loggedInAdmin);
        } catch (error) {
            next(error);
        }
    }
}

export default new AdminController();