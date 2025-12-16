import PageHeader from "@/src/components/admin-panel/PageHeader";
import ServiceForm from "@/src/components/admin-panel/services/ServiceForm";
import { Service } from "@/src/lib/type-definition";
import React from "react";

export default async function EditServicePage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/services/${id}`);
    const data = (await response.json()) as unknown as Service;
    console.log("service :", data);
    return (
        <>
            <PageHeader />
            <ServiceForm
                mode="edit"
                serviceId={id}
                defaultValues={{ title: data.title, key: data.key }}
            />
        </>
    );
}
