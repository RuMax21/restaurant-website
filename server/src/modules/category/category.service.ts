import { PrismaClient } from "@prisma/client";
import { CategoryCreateDto, CategoryUpdateDto } from "./category.dto";

const prisma = new PrismaClient();

class CategoryService {
    async getAllCategories() {
        return prisma.categories.findMany();
    }

    async createCategory(data: CategoryCreateDto) {
        return prisma.categories.create({ data });
    }

    async updateCategory(id: number, data: CategoryUpdateDto) {
        return prisma.categories.update({
            where: { id },
            data
        })
    }

    async deleteCategory(id: number) {
        return prisma.categories.delete({ where: { id } });
    }
}

export default new CategoryService();