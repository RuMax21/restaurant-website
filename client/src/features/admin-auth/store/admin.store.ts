/*
import { create } from "zustand";
import type {AdminDto} from "./admin-auth-auth.dto.ts";
import {adminApi} from "./admin-auth-auth.api.ts";

interface AdminStore {
    admins: AdminDto[];
    isLoading: boolean;
    error: string | null;
    fetchAdmins: () => Promise<void>;
}

export const useAdminStore = create<AdminStore>(
    (set) => ({
        admins: [],
        isLoading: false,
        error: null,
        fetchAdmins: async () => {
            set({ isLoading: true, error: null });
            try {
                const res = await adminApi.
            }
        }
    })
)*/
