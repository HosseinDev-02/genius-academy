import { sql } from "@/src/db";
import { OfferWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllOffers = unstable_cache(
    async () => {
        try {
            const data = await sql`
            SELECT 
            o.id,
            o.code,
            o.discount_percent,
            o.is_active,
            json_build_object (
              'id', c.id,
              'title', c.title
            ) AS course
            FROM offers o
            JOIN courses c ON c.id = o.course_id
            ORDER BY o.created_at DESC;
            `;
            return data as OfferWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ['offers'],
    {
        revalidate: 10,
        tags: ['offers'],
    }
)