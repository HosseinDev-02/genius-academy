import { sql } from "@/src/db";
import { Category } from "../type-definition";

export async function getAllCategories(): Promise<Category[]> {
    try {
        const data =
            await sql`SELECT * FROM categories ORDER BY created_at DESC`;
        return data as unknown as Category[];
    } catch (error) {
        console.error(error);
        return [];
    }
}