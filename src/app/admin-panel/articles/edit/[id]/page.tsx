import ArticleForm from "@/src/components/admin-panel/articles/ArticleForm";
import React from "react";

export default async function EditArticlePage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/articles/${id}`);
    const data = await response.json();
    return <ArticleForm articleId={id} defaultValues={{ ...data }} mode="edit" />;
}