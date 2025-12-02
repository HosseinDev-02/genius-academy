import { sql } from "@/src/db";
import { Course, CourseWithRelations, User, UserWithRelations } from "../type-definition";
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
