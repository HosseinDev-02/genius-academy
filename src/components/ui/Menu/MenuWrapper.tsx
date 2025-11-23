import React from "react";
import Menu from "./Menu";
import { getMenuTree } from "@/src/lib/storage/menu-tree";
import MobileMenu from "./MobileMenu";

type MenuWrapperProps = {
    type: "mobile" | "desktop";
};

export default async function MenuWrapper({ type }: MenuWrapperProps) {
    const menuTree = await getMenuTree();

    return type === "mobile" ? <MobileMenu data={menuTree} /> : <Menu data={menuTree} />;
}
