import React from 'react';
import { Button } from '../../../shared/ui/button/Button.tsx';

interface Column<T> {
    key: keyof T | string;
    headerName: string;
    render?: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (item: T) => void;
    onDelete?: (id: number) => void;
    idField?: keyof T;
    emptyMessage?: string;
}

export function DataTable<T>({
    data,
    columns,
    onEdit,
    onDelete,
    idField = 'id' as keyof T,
    emptyMessage = 'Data not found',
}: DataTableProps<T>) {
    return (
        <>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            {columns.map(column => (
                                <th
                                    key={String(column.key)}
                                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                >
                                    {column.headerName}
                                </th>
                            ))}
                            {(onEdit || onDelete) && (
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.map((item, index) => (
                            <tr key={index}>
                                {columns.map(column => (
                                    <td
                                        key={String(column.key)}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                                    >
                                        {column.render
                                            ? column.render(item)
                                            : String(
                                                  item[column.key as keyof T] ||
                                                      '-',
                                              )}
                                    </td>
                                ))}
                                {(onEdit || onDelete) && (
                                    <td className="px-6 py-3 whitespace-nowrap text-sm font-medium space-x-2">
                                        {onEdit && (
                                            <Button
                                                className="text-sm bg-blue-500 hover:bg-blue-600"
                                                onClick={() => onEdit(item)}
                                            >
                                                Edit
                                            </Button>
                                        )}
                                        {onDelete && (
                                            <Button
                                                className="text-sm bg-red-500 hover:bg-red-600"
                                                onClick={() =>
                                                    onDelete(
                                                        item[idField] as number,
                                                    )
                                                }
                                            >
                                                Delete
                                            </Button>
                                        )}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {data.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    {emptyMessage}
                </div>
            )}
        </>
    );
}
