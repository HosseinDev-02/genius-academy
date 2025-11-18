import { sql } from "@/src/db";
import { VideoWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllVideos = unstable_cache(
    async (): Promise<VideoWithRelations[]> => {
        try {
            const data = await sql`
            SELECT 
            v.id,
            v.title,
            v.duration,
            v.video_url,
            v.is_free,
            v.created_at,
            v.updated_at,
            json_build_object (
            'id', s.id,
            'title', s.title,
            'description', s.description
            ) AS session
            FROM videos v
            JOIN sessions s ON s.id = v.session_id
            ORDER BY v.created_at DESC;
            `;
            return data as unknown as VideoWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["videos"],
    {
        revalidate: 10,
    }
)