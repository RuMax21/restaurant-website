import React, { useState } from 'react';
import type { Category, CategoryFormData } from '../api/categories.api.ts';
import { useCategories } from '../lib/useCategories.ts';
import { Button } from '../../../shared/ui/button/Button.tsx';
import { Notification } from '../../../shared/ui/Notification.tsx';
import { FormModal } from '../../../shared/ui/modal/FormModal.tsx';
import { Input } from '../../../shared/ui/Input.tsx';
import { DataTable } from './DataTable.tsx';

export const CategoriesManager: React.FC = () => {
    const {
        categories,
        loading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    } = useCategories();
    const [show, setShow] = useState(false);
    const [editingCategories, setEditingCategories] = useState<Category | null>(
        null,
    );
    const [formData, setFormData] = useState<CategoryFormData>({
        name: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.name.trim()) return;

        const success = editingCategories
            ? await updateCategory(editingCategories.id, formData)
            : await createCategory(formData);

        if (success) resetForm();
    };

    const handleEdit = (category: Category) => {
        setEditingCategories(category);
        setFormData({
            name: category.name,
            description: category.description || '',
        });
        setShow(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this category?')) {
            await deleteCategory(id);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
        });
        setEditingCategories(null);
        setShow(false);
    };

    const columns = [
        { key: 'id', headerName: 'ID' },
        { key: 'name', headerName: 'Name' },
        { key: 'description', headerName: 'Description' },
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
                    Manage Categories
                </h2>
                <Button onClick={() => setShow(true)}>Add category</Button>
            </div>

            {error && <Notification type="error">{error}</Notification>}

            <FormModal
                isOpen={show}
                title={editingCategories ? 'Edit Category' : 'New Category'}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                submitText={editingCategories ? 'Update' : 'Cancel'}
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name *
                    </label>
                    <Input
                        type="text"
                        value={formData.name}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                name: e.target.value,
                            })
                        }
                        placeholder="Name of category"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                    </label>
                    <Input
                        type="text"
                        value={formData.description}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Description of category"
                    />
                </div>
            </FormModal>

            <DataTable
                data={categories}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                emptyMessage="Category not found."
            />
        </div>
    );
};
