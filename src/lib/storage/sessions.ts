"use server";
import { sql } from "@/src/db";
import { Session, SessionWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllSessions = unstable_cache(
    async (): Promise<SessionWithRelations[]> => {
        try {
            const data = await sql`
            SELECT 
            s.id,
            s.title,
            s.description,
            s.created_at,
            s.updated_at,
            json_build_object (
              'id', c.id,
              'title', c.title
            ) AS course
            FROM sessions s
            JOIN courses c ON c.id = s.course_id
            ORDER BY s.created_at DESC;
            `;
            return data as unknown as SessionWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["sessions"],
    {
        revalidate: 10,
        tags: ["sessions"],
    }
);

export async function getShortSessions(): Promise<Session[]> {
    try {
        const data = await sql`SELECT * FROM sessions ORDER BY created_at DESC`;
        return data as Session[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
