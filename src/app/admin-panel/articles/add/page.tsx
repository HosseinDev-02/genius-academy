import PageHeader from "@/src/components/admin-panel/PageHeader";
import ArticleForm from "@/src/components/admin-panel/articles/ArticleForm";
import React from "react";

export default function AddArticlePage() {
    return (
        <>
            <PageHeader />
            <ArticleForm mode="add" />
        </>
    );
}
