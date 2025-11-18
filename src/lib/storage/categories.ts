import { sql } from "@/src/db";
import { Category } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllCategories = unstable_cache(
    async (): Promise<Category[]> => {
        try {
            const data =
                await sql`SELECT * FROM categories ORDER BY created_at DESC`;
            return data as unknown as Category[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ['categories'],
    {
        revalidate: 10
    }
)