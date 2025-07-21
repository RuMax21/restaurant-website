export interface AdminRegisterDto {
    fullName?: string;
    email: string;
    password: string;
}

export interface AdminLoginDto {
    email: string;
    password: string;
}

export interface AdminDto {
    id: number;
    fullName: string | null;
    email: string;
    password: string;
}