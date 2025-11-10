import SubSubmenuForm from "@/src/components/admin-panel/sub-submenus/SubSubmenuForm";
import { SubSubmenu } from "@/src/lib/type-definition";
import React from "react";

export default async function EditSubSubmenuPage(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(
        `http://localhost:3000/api/sub-submenus/${id}`
    );
    const data = await response.json() as unknown as SubSubmenu;
    return (
        <SubSubmenuForm
            mode="edit"
            subSubmenuId={id}
            defaultValues={{
                title: data.title,
                url: data.url,
                order_index: data.order_index,
                submenu_id: data.submenu_id,
            }}
        />
    );
}
