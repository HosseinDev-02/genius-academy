import { sql } from "@/src/db";
import { Course, User, UserWithRelations } from "../type-definition";
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
            u.id,
            u.name,
            u.phone_number,
            u.email,
            u.image,
            u.created_at,
            u.updated_at,
        
            COALESCE(
                JSON_AGG(
                    DISTINCT JSONB_BUILD_OBJECT(
                        'id', c.id,
                        'title', c.title,
                        'short_name', c.short_name,
                        'image', c.image,
                        'created_at', c.created_at,
                        'updated_at', c.updated_at
                    )
                ) FILTER (WHERE c.id IS NOT NULL),
                '[]'
            ) AS courses
        
        FROM users u
        LEFT JOIN user_courses uc ON u.id = uc.user_id
        LEFT JOIN courses c ON c.id = uc.course_id
        WHERE u.id = ${userId}
        GROUP BY u.id;
        
            `;
            return data[0] as unknown as UserWithRelations;
        } catch (error) {
            console.log(error);
            return {};
        }
    },
    ["user_courses"],
    {
        revalidate: 10,
        tags: ["user_courses"],
    }
);

export const getUserCourseById = unstable_cache(
    async (userId: string, courseId: string) => {
        try {
            const data = await sql`
        SELECT 
        c.*
        FROM user_courses uc
        JOIN courses c ON c.id = uc.course_id
        WHERE uc.user_id = '12527d23-a4c3-44a6-b3ea-636912cc85fd'
        AND uc.course_id = '8291cc97-8b3c-4078-8bb0-d432daa538ac'
        LIMIT 1;
        `;
            return data[0] as unknown as Course;
        } catch (error) {
            console.log(error);
            return {};
        }
    }
);
