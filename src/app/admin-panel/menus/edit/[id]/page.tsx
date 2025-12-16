import PageHeader from "@/src/components/admin-panel/PageHeader";
import MenuForm from "@/src/components/admin-panel/menus/MenuForm";
import { Menu } from "@/src/lib/type-definition";
import React from "react";

export default async function EditMenuPage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/menus/${id}`);
    const data = (await response.json()) as unknown as Menu;
    return (
        <>
            <PageHeader />
            <MenuForm
                mode="edit"
                menuId={id}
                defaultValues={{
                    title: data.title,
                    url: data.url,
                    order_index: data.order_index,
                }}
            />
        </>
    );
}
