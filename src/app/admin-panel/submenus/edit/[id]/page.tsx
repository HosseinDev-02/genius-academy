import SubmenuForm from "@/src/components/admin-panel/submenus/SubmenuForm";
import { SubMenu } from "@/src/lib/type-definition";
import React from "react";

export default async function page(context: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await context.params;
    const response = await fetch(`http://localhost:3000/api/submenus/${id}`);
    const submenu = (await response.json()) as unknown as SubMenu;
    return (
        <SubmenuForm
            defaultValues={{
                title: submenu.title,
                url: submenu.url,
                order_index: submenu.order_index,
                menu_id: submenu.menu_id,
            }}
            submenuId={id}
            mode="edit"
        />
    );
}
