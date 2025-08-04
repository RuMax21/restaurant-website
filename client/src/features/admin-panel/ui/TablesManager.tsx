import React, { useState } from 'react';
import { useTables } from '../lib/useTables.ts';
import type { Table, TableFormData } from '../api/tables.api.ts';
import { Button } from '../../../shared/ui/button/Button.tsx';
import { Notification } from '../../../shared/ui/Notification.tsx';
import { FormModal } from '../../../shared/ui/modal/FormModal.tsx';
import { Input } from '../../../shared/ui/Input.tsx';
import { DataTable } from './DataTable.tsx';

export const TablesManager: React.FC = () => {
    const { tables, loading, error, createTable, updateTable, deleteTable } =
        useTables();
    const [showForm, setShowForm] = useState(false);
    const [editingTable, setEditingTable] = useState<Table | null>(null);
    const [formData, setFormData] = useState<TableFormData>({
        number: '',
        capacity: 1,
        location: '',
        isAvailable: true,
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.number.trim() || formData.capacity <= 0) return;

        const success = editingTable
            ? await updateTable(editingTable.id, formData)
            : await createTable(formData);

        if (success) {
            resetForm();
        }
    };

    const handleEdit = (table: Table) => {
        setEditingTable(table);
        setFormData({
            number: table.number,
            capacity: table.capacity,
            location: table.location || '',
            isAvailable: table.isAvailable,
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm(`Are you sure you want to delete this table?`)) {
            await deleteTable(id);
        }
    };

    const resetForm = () => {
        setFormData({
            number: '',
            capacity: 1,
            location: '',
            isAvailable: true,
        });
        setEditingTable(null);
        setShowForm(false);
    };

    const columns = [
        { key: 'id', headerName: 'ID' },
        { key: 'number', headerName: 'Number' },
        {
            key: 'capacity',
            headerName: 'Capacity',
            render: (table: Table) => `${table.capacity} people`,
        },
        { key: 'location', headerName: 'Location' },
        {
            key: 'isAvailable',
            headerName: 'IsAvailable',
            render: (table: Table) => (
                <span
                    className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full
                ${
                    table.isAvailable
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                }
                `}
                >
                    {table.isAvailable ? 'Available' : 'Unavailable'}
                </span>
            ),
        },
    ];

    if (loading) {
        return (
            <div className="p-6">
                <div className="text-center">Loading...</div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Manage Tables
                </h2>
                <Button onClick={() => setShowForm(true)}>Add table</Button>
            </div>

            {error && <Notification type="error">{error}</Notification>}

            <FormModal
                isOpen={showForm}
                title={editingTable ? 'Edit table' : 'New table'}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                submitText={editingTable ? 'Update' : 'Add'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Table number *
                        </label>
                        <Input
                            type="text"
                            value={formData.number}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    number: e.target.value,
                                })
                            }
                            placeholder="Example: A1, B2, VIP1"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Capacity *
                        </label>
                        <Input
                            type="number"
                            min="1"
                            max="20"
                            value={formData.capacity}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    capacity: Number(e.target.value),
                                })
                            }
                            placeholder="Number of seats"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Location
                    </label>
                    <Input
                        type="text"
                        value={formData.location}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                location: e.target.value,
                            })
                        }
                        placeholder="Example: Terrace, Lounge, VIP area"
                    />
                </div>
            </FormModal>

            <DataTable
                data={tables}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                emptyMessage="Tables not found"
            />
        </div>
    );
};
