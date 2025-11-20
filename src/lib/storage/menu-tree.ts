import { unstable_cache } from "next/cache";
import { sql } from "@/src/db";

type SubSubmenu = {
    id: number;
    title: string;
    url: string;
};

type Submenu = {
    id: number;
    title: string;
    url: string;
    sub_submenus: SubSubmenu[];
};

export type MenuTree = {
    id: number;
    url: string;
    title: string;
    submenus: Submenu[];
};

type Row = {
    menu_id: number;
    menu_title: string;
    menu_url: string;
    submenu_id: number;
    submenu_title: string;
    submenu_url: string;
    subsubmenu_id: number;
    subsubmenu_title: string;
    subsubmenu_url: string;
};

export const getMenuTree = unstable_cache(
    async (): Promise<MenuTree[]> => {
        const rows = (await sql`
      SELECT
      m.id        AS menu_id,
      m.title     AS menu_title,
      m.url     AS menu_url,
  
      sm.id       AS submenu_id,
      sm.title    AS submenu_title,
      sm.url    AS submenu_url,
  
      ssm.id      AS subsubmenu_id,
      ssm.title   AS subsubmenu_title,
      ssm.url   AS subsubmenu_url
  
  FROM menus m
  LEFT JOIN submenus sm
      ON sm.menu_id = m.id
  LEFT JOIN sub_submenus ssm
      ON ssm.submenu_id = sm.id
  
  ORDER BY m.order_index, sm.order_index, ssm.order_index;
      `) as unknown as Row[];

        const tree: MenuTree[] = [];
        const menuMap = new Map<number, MenuTree>();
        const submenuMap = new Map<number, Submenu>();

        for (const row of rows) {
            // --- Menu ---
            if (!menuMap.has(row.menu_id)) {
                menuMap.set(row.menu_id, {
                    id: row.menu_id,
                    title: row.menu_title,
                    url: row.menu_url,
                    submenus: [],
                });
                tree.push(menuMap.get(row.menu_id)!);
            }

            const menu = menuMap.get(row.menu_id)!;

            // --- Submenu ---
            if (row.submenu_id && !submenuMap.has(row.submenu_id)) {
                submenuMap.set(row.submenu_id, {
                    id: row.submenu_id,
                    title: row.submenu_title,
                    url: row.submenu_url,
                    sub_submenus: [],
                });
                menu.submenus.push(submenuMap.get(row.submenu_id)!);
            }

            const submenu = row.submenu_id
                ? submenuMap.get(row.submenu_id)
                : null;

            // --- SubSubmenu ---
            if (submenu && row.subsubmenu_id) {
                submenu.sub_submenus.push({
                    id: row.subsubmenu_id,
                    title: row.subsubmenu_title,
                    url: row.subsubmenu_url,
                });
            }
        }

        return tree;
    },
    ["menu-tree"], // key cache
    { tags: ["menu-tree"] } // tags برای revalidateTag
);
