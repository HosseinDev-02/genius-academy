import CategoryForm from "@/src/components/admin-panel/categories/CategoryForm";
import { Category } from "@/src/lib/type-definition";
import React from "react";

export default async function page(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/categories/${id}`);
    const category = (await response.json()) as unknown as Category;

    return (
        <CategoryForm
            mode="edit"
            defaultValues={{
                title: category.title,
                short_name: category.short_name,
            }}
            categoryId={id}
        />
    );
}
