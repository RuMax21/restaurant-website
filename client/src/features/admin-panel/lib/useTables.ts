import {
    type Table,
    type TableFormData,
    tablesApi,
} from '../api/tables.api.ts';
import { useEffect, useState } from 'react';

export const useTables = () => {
    const [tables, setTables] = useState<Table[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchTables = async () => {
        try {
            setLoading(true);
            const response = await tablesApi.getAll();
            setTables(response.data);
            setError(null);
        } catch (error) {
            setError('There was an error fetching tables');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const createTable = async (data: TableFormData) => {
        try {
            await tablesApi.create(data);
            await fetchTables();
            return true;
        } catch (error) {
            setError('There was an error creating table');
            console.error(error);
            return false;
        }
    };

    const updateTable = async (id: number, data: TableFormData) => {
        try {
            await tablesApi.update(id, data);
            await fetchTables();
            return true;
        } catch (error) {
            setError('There was an error updating table');
            console.error(error);
            return false;
        }
    };

    const deleteTable = async (id: number) => {
        try {
            await tablesApi.delete(id);
            await fetchTables();
            return true;
        } catch (error) {
            setError('There was an error deleting table');
            console.error(error);
            return false;
        }
    };

    useEffect(() => {
        fetchTables();
    }, []);

    return {
        tables,
        loading,
        error,
        setLoading,
        createTable,
        updateTable,
        deleteTable,
        fetchTables,
    };
};
