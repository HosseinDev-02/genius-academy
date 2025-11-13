'use server';
import { sql } from "@/src/db";
import { SubSubmenuWithRelations } from "../type-definition";

export async function getAllSubSubmenus(): Promise<SubSubmenuWithRelations[]> {
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
        ) AS submenu
      FROM sub_submenus s
      JOIN submenus m ON s.submenu_id = m.id
      ORDER BY s.created_at DESC;`;
        return data as unknown as SubSubmenuWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}