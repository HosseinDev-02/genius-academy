'use client';
import { MenuTree } from "@/src/lib/storage/menu-tree";
import Menu from "./Menu";

export default function MenuWrapper({ data }: {data: MenuTree[]}) {
    return (
        <Menu data={data}/>
    );
}
