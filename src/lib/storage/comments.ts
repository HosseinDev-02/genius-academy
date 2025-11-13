import { sql } from "@/src/db";
import { CommentWithRelations } from "../type-definition";

export async function getAllComments(): Promise<CommentWithRelations[]> {
    try {
        const data = await sql`
        SELECT 
        comment.id,
        comment.content,
        comment.created_at,
        comment.updated_at,
        comment.status,
        json_build_object(
        'id', u.id,
        'name', u.name,
        'image', u.image
        ) AS user,
        json_build_object('id', pu.id, 'name', pu.name) AS parent_user,
        CASE
            WHEN comment.course_id IS NOT NULL THEN json_build_object('id', c.id,'title', c.title,'image', c.image,'short_name', c.short_name)
        ELSE NULL
            END AS course,
        CASE
            WHEN comment.article_id IS NOT NULL THEN json_build_object('id', a.id,'title', a.title,'image', a.image,'short_name', a.short_name) 
        ELSE NULL
            END AS article
        FROM comments comment
        JOIN users u ON comment.user_id = u.id
        LEFT JOIN courses c ON comment.course_id = c.id
        LEFT JOIN articles a ON comment.article_id = a.id
        LEFT JOIN comments p ON p.id = comment.parent_id
        LEFT JOIN users pu ON pu.id = p.user_id
        ORDER BY comment.created_at DESC;
        `;
        return data as unknown as CommentWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}