import PageHeader from "@/src/components/admin-panel/PageHeader";
import ServiceForm from "@/src/components/admin-panel/services/ServiceForm";
import React from "react";

export default function AddServicePage() {
    return (
        <>
            <PageHeader />
            <ServiceForm mode="add" />
        </>
    );
}
