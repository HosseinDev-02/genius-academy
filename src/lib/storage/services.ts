import { sql } from "@/src/db";
import { Service } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllServices = unstable_cache(
    async () => {
        try {
            const data =
                await sql`SELECT * FROM services ORDER BY created_at DESC`;
            return data as Service[];
        } catch (error) {
            return [];
        }
    },
    ["services"],
    {
        revalidate: 10,
        tags: ["services"],
    }
);
