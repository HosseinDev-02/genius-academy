import PageHeader from "@/src/components/admin-panel/PageHeader";
import SubSubmenuForm from "@/src/components/admin-panel/sub-submenus/SubSubmenuForm";
import React from "react";

export default function AddSubSubmenuPage() {
    return (
        <>
            <PageHeader />
            <SubSubmenuForm mode="add" />
        </>
    );
}
