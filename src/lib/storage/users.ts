import { sql } from "@/src/db";
import {
    CommentWithRelations,
    Course,
    CourseWithRelations,
    User,
    UserWithRelations,
} from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllTeachers = unstable_cache(
    async (): Promise<User[]> => {
        try {
            const data =
                await sql`SELECT * FROM users WHERE role = 'teacher' ORDER BY created_at DESC`;
            console.log(data);
            return data as unknown as User[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["users"],
    {
        revalidate: 10,
        tags: ["users"],
    }
);

export const getAllUsers = unstable_cache(
    async (): Promise<User[]> => {
        try {
            const data =
                await sql`SELECT * FROM users ORDER BY created_at DESC`;
            return data as unknown as User[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["users"],
    {
        tags: ["users"],
        revalidate: 10,
    }
);

export const getAdminUsers = unstable_cache(
    async (): Promise<User[]> => {
        try {
            const data =
                await sql`SELECT * FROM users WHERE role != 'user' ORDER BY created_at DESC`;
            return data as unknown as User[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["users"],
    {
        revalidate: 10,
        tags: ["users"],
    }
);

export const getUserCourses = unstable_cache(
    async (userId: string) => {
        try {
            const data = await sql`
            SELECT 
            c.price, 
            c.is_completed, 
            c.short_name, 
            c.title, 
            c.image,
            to_json(cat.*) AS category,
            to_json(u.*) AS user
            FROM user_courses uc
            JOIN courses c ON c.id = uc.course_id
            LEFT JOIN categories cat ON cat.id = c.category_id
            LEFT JOIN users u ON u.id = c.user_id
            WHERE uc.user_id = ${userId};
            `;
            return data as CourseWithRelations[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    ["user_courses"],
    {
        revalidate: 10,
        tags: ["user_courses"],
    }
);

export const getUserCourseById = unstable_cache(
    async (userId: string, courseId: string): Promise<Course | null> => {
        try {
            const data = await sql`
        SELECT 
        c.*
        FROM user_courses uc
        JOIN courses c ON c.id = uc.course_id
        WHERE uc.user_id = ${userId}
        AND uc.course_id = ${courseId}
        LIMIT 1;
        `;
            return data[0] as Course;
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    ["user_courses"],
    {
        revalidate: 10,
        tags: ["user_courses"],
    }
);

interface UComment {
    id: string;
    name: string;
    image: string;
}

interface CComment {
    id: string;
    title: string;
    image: string;
    short_name: string;
}

interface AComment {
    id: string;
    title: string;
    image: string;
    short_name: string;
}

export type UserComment = {
    id: string;
    content: string;
    status: 'approved' | 'pending' | 'rejected';
    user: UComment;
    course: CComment | null;
    article: AComment | null;
};

export const getUserComments = unstable_cache(
    async (userId: string): Promise<UserComment[]> => {
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
            WHERE comment.user_id = ${userId}
            AND comment.parent_id IS NULL 
            ORDER BY comment.created_at DESC;
            `;
            return data as UserComment[];
        } catch (error) {
            return [];
        }
    }
);
