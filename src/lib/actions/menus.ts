"use server";

import { sql } from "@/src/db";
import { Menu } from "../type-definition";

export const getAllMenus = async () => {
    try {
        const menus = await sql`SELECT * FROM menus ORDER BY created_at DESC`;
        return menus as Menu[];
    } catch (error) {
        return [];
    }
};
