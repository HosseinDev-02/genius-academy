import { sql } from "@/src/db";
// import { CommentWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

interface User {
    id: string;
    name: string;
    image: string | null;
}

interface Course {
    id: string;
    title: string;
    image: string | null;
    short_name: string;
}

interface Article {
    id: string;
    title: string;
    image: string | null;
    short_name: string;
}

interface CommentRow {
    id: string;
    content: string;
    created_at: string; // PostgreSQL → text
    updated_at: string | null;
    status: string;
    parent_id: string | null;

    user: User | null;
    course: Course | null;
    article: Article | null;
}

interface CommentWithRelations extends CommentRow {
    replies: CommentWithRelations[];
}

export const getCommentsByShortName = unstable_cache(
    async ({
        courseShortName,
        articleShortName,
    }: {
        courseShortName?: string | null;
        articleShortName?: string | null;
    }): Promise<CommentWithRelations[]> => {
        try {
            // 🔥 fix: always convert undefined → null
            const courseName = courseShortName ?? null;
            const articleName = articleShortName ?? null;

            console.log(
                `courseName: ${courseName}, articleName: ${articleName}`
            );

            const data = await sql`
            SELECT 
            comment.id,
            comment.content,
            comment.created_at,
            comment.updated_at,
            comment.status,
            comment.parent_id,
            CASE
                WHEN comment.user_id IS NOT NULL THEN json_build_object(
                    'id', u.id,
                    'name', u.name,
                    'image', u.image
                )
                ELSE NULL
            END AS user,
            CASE
                WHEN comment.course_id IS NOT NULL THEN json_build_object(
                    'id', c.id,
                    'title', c.title,
                    'image', c.image,
                    'short_name', c.short_name
                )
                ELSE NULL
            END AS course,
            CASE
                WHEN comment.article_id IS NOT NULL THEN json_build_object(
                    'id', a.id,
                    'title', a.title,
                    'image', a.image,
                    'short_name', a.short_name
                )
                ELSE NULL
            END AS article
            FROM comments comment
            JOIN users u ON comment.user_id = u.id
            LEFT JOIN courses c ON comment.course_id = c.id
            LEFT JOIN articles a ON comment.article_id = a.id
            LEFT JOIN comments p ON p.id = comment.parent_id
            WHERE 
                (
                    (${courseName}::text IS NOT NULL AND c.short_name = ${courseName}::text)
                    OR 
                    (${articleName}::text IS NOT NULL AND a.short_name = ${articleName}::text)
                )
                AND comment.status = 'approved'  
            ORDER BY comment.created_at DESC;`;

            const rows = data as CommentRow[];

            // ساخت آرایه تایپ‌سیف
            const comments: CommentWithRelations[] = rows.map((row) => ({
                ...row,
                replies: [],
            }));

            // ساخت درخت کامنت‌ها
            const map: Record<number, CommentWithRelations> = {};
            const roots: CommentWithRelations[] = [];

            comments.forEach((c) => (map[+c.id] = c));

            comments.forEach((c) => {
                if (c.parent_id && map[+c.parent_id]) {
                    map[+c.parent_id].replies.push(c);
                } else {
                    roots.push(c);
                }
            });

            return roots;
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    ["comments"],
    {
        tags: ["comments"],
    }
);

export const getAllComments = unstable_cache(
    async (): Promise<CommentWithRelations[]> => {
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
    },
    ["comments"],
    {
        revalidate: 10,
    }
);
