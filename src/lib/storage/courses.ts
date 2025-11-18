import { sql } from "@/src/db";
import { Course, CourseWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllCourses = unstable_cache(
    async (): Promise<CourseWithRelations[]> => {
        try {
            const data = await sql`SELECT 
          c.id,
          c.title,
          c.price,
          c.image,
          c.short_name,
          c.is_completed,
          c.content,
          c.about,
          json_build_object(
            'id', cat.id,
            'title', cat.title,
            'short_name', cat.short_name
          ) AS category,
          json_build_object(
            'id', u.id,
            'name', u.name,
            'role', u.role,
            'image', u.image,
            'about', u.about
          ) AS user,
            c.created_at,
          c.updated_at
        FROM courses c
        JOIN categories cat ON c.category_id = cat.id
        JOIN users u ON c.user_id = u.id
        ORDER BY c.created_at DESC`;
            return data as unknown as CourseWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["courses"],
    {
        revalidate: 10,
    }
);

// export async function getAllCourses(): Promise<CourseWithRelations[]> {

// }

export async function getShortCourses(): Promise<Course[]> {
    try {
        const data = await sql`SELECT * FROM courses ORDER BY created_at DESC`;
        return data as Course[];
    } catch (error) {
        console.log(error);
        return [];
    }
}

export async function getCourseByShortName(
    shortName: string
): Promise<CourseWithRelations | {}> {
    try {
        const data = await sql`SELECT 
            c.id,
            c.title,
            c.price,
            c.image,
            c.short_name,
            c.is_completed,
            c.content,
            c.about,
            json_build_object(
              'id', cat.id,
              'title', cat.title,
              'short_name', cat.short_name
            ) AS category,
            json_build_object(
              'id', u.id,
              'name', u.name,
              'role', u.role,
              'image', u.image,
              'about', u.about
            ) AS user,
              c.created_at,
            c.updated_at
          FROM courses c
          JOIN categories cat ON c.category_id = cat.id
          JOIN users u ON c.user_id = u.id
          WHERE c.short_name = ${shortName} ORDER BY c.created_at DESC`;
        return data[0] as unknown as CourseWithRelations;
    } catch (error) {
        console.error(error);
        return {};
    }
}
