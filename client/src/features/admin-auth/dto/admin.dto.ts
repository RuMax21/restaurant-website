export interface AdminDto {
    id: number;
    fullName: string;
    email: string;
}

export interface AdminLoginDto {
    email: string;
    password: string;
}

export interface AdminRegisterDto {
    fullName: string;
    email: string;
    password: string;
}

export interface AdminLoginResponse {
    token: string;
    admin: AdminDto | null;
}