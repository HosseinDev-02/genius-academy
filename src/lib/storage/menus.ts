import { sql } from "@/src/db";
import { Menu } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllMenus = unstable_cache(
    async () => {
        try {
            const menus = await sql`SELECT * FROM menus ORDER BY created_at DESC`;
            return menus as Menu[];
        } catch (error) {
            return [];
        }
    },
    ['menus'],
    {
        revalidate: 10,
        tags: ['menus'],
    }
) 