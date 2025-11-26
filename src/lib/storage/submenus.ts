import { sql } from "@/src/db";
import { SubMenuWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllSubmenus = unstable_cache(
    async (): Promise<SubMenuWithRelations[]> => {
        try {
            const data = await sql`
      SELECT 
      s.id,
      s.title,
      s.url,
      s.order_index,
      s.created_at,
      s.updated_at,
      json_build_object(
        'id', m.id,
        'title', m.title,
        'url', m.url
      ) AS menu
    FROM submenus s
    JOIN menus m ON s.menu_id = m.id
    ORDER BY s.created_at DESC;`;
            return data as unknown as SubMenuWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["submenus"],
    {
        revalidate: 10,
        tags: ["submenus"],
    }
);
