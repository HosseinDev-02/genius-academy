import { sql } from "@/src/db";
import { Session, SessionWithRelations } from "../type-definition";

export async function getAllSessions(): Promise<SessionWithRelations[]> {
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
}

export async function getShortSessions(): Promise<Session[]> {
    try {
        const data = await sql`SELECT * FROM sessions ORDER BY created_at DESC`;
        return data as Session[];
    } catch (error) {
        console.error(error);
        return [];
    }
}