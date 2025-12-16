import PageHeader from "@/src/components/admin-panel/PageHeader";
import UserForm from "@/src/components/admin-panel/users/UserForm";
import React from "react";

export default function AddUserPage() {
    return (
        <>
            <PageHeader />
            <UserForm mode="add" />
        </>
    );
}
