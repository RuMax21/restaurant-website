import React, { useState } from 'react';
import { useDishes } from '../lib/useDishes.ts';
import type { Dish, DishFormData } from '../api/dish.api.ts';
import { Button } from '../../../shared/ui/button/Button.tsx';
import { Notification } from '../../../shared/ui/Notification.tsx';
import { FormModal } from '../../../shared/ui/modal/FormModal.tsx';
import { Input } from '../../../shared/ui/Input.tsx';
import { DataTable } from './DataTable.tsx';

export const DishesManager: React.FC = () => {
    const {
        dishes,
        categories,
        loading,
        error,
        createDish,
        updateDish,
        deleteDish,
    } = useDishes();

    const [showForm, setShowForm] = useState(false);
    const [editingDish, setEditingDish] = useState<Dish | null>(null);
    const [formData, setFormData] = useState<DishFormData>({
        name: '',
        description: '',
        price: 0,
        categoryId: 0,
        imageUrls: [],
        ingredients: {},
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !formData.name.trim() ||
            formData.price <= 0 ||
            formData.categoryId === 0
        )
            return;

        const success = editingDish
            ? await updateDish(editingDish.id, formData)
            : await createDish(formData);

        if (success) resetForm();
    };

    const handleEdit = (dish: Dish) => {
        setEditingDish(dish);
        setFormData({
            name: dish.name,
            description: dish.description,
            price: dish.price,
            categoryId: dish.categoryId,
            imageUrls: dish.imageUrls,
            ingredients: dish.ingredients || {},
        });
        setShowForm(true);
    };

    const handleDelete = async (id: number) => {
        if (confirm('Are you sure you want to delete this dish?')) {
            await deleteDish(id);
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: 0,
            categoryId: 0,
            imageUrls: [],
            ingredients: {},
        });
        setEditingDish(null);
        setShowForm(false);
    };

    const addIngredient = () => {
        const newIngredientKey = `ingredient_${Object.keys(formData.ingredients || {}).length + 1}`;
        setFormData({
            ...formData,
            imageUrls: [...formData.imageUrls, ''],
            ingredients: {
                ...formData.ingredients,
                [newIngredientKey]: '',
            },
        });
    };

    const updateIngredient = (key: string, value: string) => {
        setFormData({
            ...formData,
            ingredients: {
                ...formData.ingredients,
                [key]: value,
            },
        });
    };

    const removeIngredient = (key: string) => {
        const newIngredients = { ...formData.ingredients };
        delete newIngredients[key];
        setFormData({
            ...formData,
            ingredients: newIngredients,
        });
    };

    const getIngredientLabel = (key: string) => {
        const index = Object.keys(formData.ingredients || {}).indexOf(key) + 1;
        return `Ingredient ${index}`;
    };

    const handleImagesChange = (imageUrls: Array<string>) => {
        setFormData({
            ...formData,
            imageUrls,
        });
    };

    const columns = [
        { key: 'id', headerName: 'ID' },
        { key: 'name', headerName: 'Name' },
        {
            key: 'category',
            headerName: 'Category',
            render: (dish: Dish) => dish.category?.name || 'Unspecified',
        },
        {
            key: 'price',
            headerName: 'Price',
            render: (dish: Dish) => `${dish.price.toFixed(2)}`,
        },
        {
            key: 'ingredients',
            headerName: 'Ingredients',
            render: (dish: Dish) => {
                if (
                    dish.ingredients ||
                    Object.keys(dish.ingredients).length === 0
                ) {
                    return 'Unspecified';
                }
                const ingredientList = Object.values(dish.ingredients).filter(
                    Boolean,
                );
                return ingredientList.length > 0
                    ? ingredientList.slice(0, 2).join(', ') +
                      (ingredientList.length > 2)
                        ? '...'
                        : ''
                    : 'Unspecified';
            },
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
                    Manage Dish
                </h2>
                <Button onClick={() => setShowForm(true)}>Add Dish</Button>
            </div>

            {error && <Notification type="error">{error}</Notification>}

            <FormModal
                isOpen={showForm}
                title={editingDish ? 'Edit Dish' : 'New Dish'}
                onSubmit={handleSubmit}
                onCancel={resetForm}
                submitText={editingDish ? 'Update' : 'Add Dish'}
            >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            placeholder="Enter name of dish"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category *
                        </label>
                        <select
                            value={formData.categoryId}
                            onChange={e =>
                                setFormData({
                                    ...formData,
                                    categoryId: Number(e.target.value),
                                })
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                        >
                            <option value={0}>Choose category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm fmedium text-gray-700 mb-1">
                        Description *
                    </label>
                    <textarea
                        value={formData.description}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                description: e.target.value,
                            })
                        }
                        placeholder="Enter description of dish"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price *
                    </label>
                    <Input
                        type="number"
                        step="1"
                        min="0"
                        value={formData.price}
                        onChange={e =>
                            setFormData({
                                ...formData,
                                price: Number(e.target.value),
                            })
                        }
                        placeholder="0"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ingredients
                    </label>
                    {Object.entries(formData.ingredients || {}).map(
                        ([key, value]) => (
                            <div key={key} className="flex gap-2 mb-2">
                                <div className="flex-1">
                                    <label className="block text-xs text-gray-500 mb-1">
                                        {getIngredientLabel(key)}
                                    </label>
                                    <Input
                                        type="text"
                                        value={value as string}
                                        onChange={e =>
                                            updateIngredient(
                                                key,
                                                e.target.value,
                                            )
                                        }
                                        placeholder="Example: Floor, 200g"
                                    />
                                </div>

                                <div className="flex items-end">
                                    <Button
                                        type="button"
                                        onClick={() => removeIngredient(key)}
                                        className="bg-red-500 hover:bg-red-600"
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        ),
                    )}
                    <Button
                        type="button"
                        onClick={addIngredient}
                        className="bg-green-500 hover:bg-green-600"
                    >
                        + add ingredient
                    </Button>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Images
                    </label>
                </div>
            </FormModal>

            <DataTable
                data={dishes}
                columns={columns}
                onEdit={handleEdit}
                onDelete={handleDelete}
                emptyMessage="Dishes not found"
            />
        </div>
    );
};
