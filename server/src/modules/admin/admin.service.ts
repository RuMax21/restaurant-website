import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt, {JwtPayload} from 'jsonwebtoken';
import { AdminDto, AdminLoginDto, AdminRegisterDto } from "./admin.dto";
import { ApiError } from "../../exception/api-errors.exception";

const JWT_SECRET: string = process.env.JWT_SECRET || 'secret';

export class AdminService {
    private prisma = new PrismaClient();

    async registerAdmin(data: AdminRegisterDto): Promise<AdminDto> {
        const existing: AdminDto | null = await this.prisma.admins.findUnique({
            where: { email: data.email }
        });
        if (existing) throw ApiError.Conflict("Email already exists");

        const hash: string = await bcrypt.hash(data.password, 10);
        const admin: AdminDto = await this.prisma.admins.create({
            data: { ...data, password: hash }
        });

        return admin;
    }

    async loginAdmin(data: AdminLoginDto): Promise<{ token: string, admin: AdminDto }> {
        const admin: AdminDto | null = await this.prisma.admins.findUnique({
            where: { email: data.email }
        });
        if (!admin) throw ApiError.Forbidden('Invalid credentials');

        const valid: boolean = await bcrypt.compare(data.password, admin.password);
        if (!valid) throw ApiError.Forbidden('Invalid credentials');

        const token: string = jwt.sign({ id: admin.id, email: admin.email }, JWT_SECRET, { expiresIn: '7d' });
        return { token, admin };
    }

    static verifyToken(token: string): JwtPayload | string {
        return jwt.verify(token, JWT_SECRET);
    }
}