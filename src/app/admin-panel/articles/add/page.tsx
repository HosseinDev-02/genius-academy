import PageHeader from "@/src/components/admin-panel/PageHeader";
import ArticleForm from "@/src/components/admin-panel/articles/ArticleForm";
import { getAllCategories } from "@/src/lib/storage/categories";
import { getAllAuthors } from "@/src/lib/storage/users";
import { User } from "@/src/lib/type-definition";
import React from "react";

export default async function AddArticlePage() {
    const authors = await getAllAuthors();
    const categories = await getAllCategories();
    return (
        <>
            <PageHeader />
            <ArticleForm authors={authors} categories={categories} mode="add" />
        </>
    );
}
