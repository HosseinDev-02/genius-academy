import PageHeader from "@/src/components/admin-panel/PageHeader";
import CategoryForm from "@/src/components/admin-panel/categories/CategoryForm";
import React from "react";

export default function AddCategoryPage() {
    return (
        <>
            <PageHeader />
            <CategoryForm mode="add" />
        </>
    );
}
