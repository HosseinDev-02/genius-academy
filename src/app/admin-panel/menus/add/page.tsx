import PageHeader from "@/src/components/admin-panel/PageHeader";
import MenuForm from "@/src/components/admin-panel/menus/MenuForm";
import React from "react";

export default function AddMenuItemPage() {
    return (
        <>
            <PageHeader />
            <MenuForm mode="add" />
        </>
    );
}
