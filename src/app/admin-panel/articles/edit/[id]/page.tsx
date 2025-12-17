import PageHeader from "@/src/components/admin-panel/PageHeader";
import ArticleForm from "@/src/components/admin-panel/articles/ArticleForm";
import { getAllCategories } from "@/src/lib/storage/categories";
import { getAllAuthors } from "@/src/lib/storage/users";
import React from "react";

export default async function EditArticlePage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/articles/${id}`);
    const data = await response.json();
    const authors = await getAllAuthors();
    const categories = await getAllCategories();
    return (
        <>
            <PageHeader />
            <ArticleForm
                authors={authors}
                categories={categories}
                articleId={id}
                defaultValues={{ ...data }}
                mode="edit"
            />
        </>
    );
}
