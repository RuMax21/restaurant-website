import {useState} from "react";
import type {AdminLoginDto, AdminRegisterDto} from "../dto/admin.dto.ts";
import {adminApi} from "../api/admin.api.ts";

export function useAdminAuth() {
    const [loading, setLoading] = useState(false);

    const login = async (dto: AdminLoginDto) => {
        setLoading(true);

        try {
            const res = await adminApi.login(dto);
            localStorage.setItem("token", res.data.token);
        } catch(error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    };
    
    const register = async (dto: AdminRegisterDto) => {
        setLoading(true);

        try {
            await adminApi.register(dto);
        } catch(error) {
            console.error(error);
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return { login, register, loading };
}