import { sql } from "@/src/db";
import { Course, CourseWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllCourses = unstable_cache(
    async (): Promise<CourseWithRelations[]> => {
        try {
            const data = await sql`
            SELECT
                c.id,
                c.title,
                c.price,
                c.image,
                c.short_name,
                c.is_completed,
                c.content,
                c.about,
                -- Category object (all fields)
                row_to_json(c) AS category,
                -- User object (all fields)
                row_to_json(u) AS user,
                o.discount_percent AS offer
            FROM courses c
            JOIN categories cat ON c.category_id = cat.id
            JOIN users u ON c.user_id = u.id
            LEFT JOIN offers o 
                ON o.course_id = c.id
                AND o.is_active = TRUE
            ORDER BY c.created_at DESC
            `;

            return data as CourseWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["courses"],
    {
        revalidate: 10,
        tags: ["courses"],
    }
);

export const getShortCourses = unstable_cache(
    async (): Promise<Course[]> => {
        try {
            const data =
                await sql`SELECT * FROM courses ORDER BY created_at DESC`;
            return data as Course[];
        } catch (error) {
            console.log(error);
            return [];
        }
    },
    ["courses"],
    {
        revalidate: 10,
        tags: ["courses"],
    }
);

export const getCourseByShortName = unstable_cache(
    async (shortName: string): Promise<CourseWithRelations | null> => {
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
            return data[0] as CourseWithRelations;
        } catch (error) {
            return null;
        }
    },
    ["courses"],
    {
        revalidate: 10,
        tags: ["courses"],
    }
);

export const getLatestCourses = unstable_cache(
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
            -- Category object (all fields)
          row_to_json(c) AS category,
            -- User object (all fields)
          row_to_json(u) AS user,
              c.created_at,
            c.updated_at
          FROM courses c
          JOIN categories cat ON c.category_id = cat.id
          JOIN users u ON c.user_id = u.id
          ORDER BY c.created_at DESC LIMIT 3;`;
            return data as CourseWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["courses"],
    {
        revalidate: 10,
        tags: ["courses"],
    }
);

export const getPopularCourses = unstable_cache(
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
            -- Category object (all fields)
            row_to_json(c) AS category,
            -- User object (all fields)
            row_to_json(u) AS user,
            c.created_at,
            c.updated_at
            FROM courses c
            JOIN categories cat ON c.category_id = cat.id
            JOIN users u ON c.user_id = u.id
            ORDER BY c.created_at DESC LIMIT 6`;
            return data as CourseWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["courses"],
    {
        revalidate: 10,
        tags: ["courses"],
    }
);

// SELECT
//         c.id,
//             c.title,
//             c.price,
//             c.image,
//             c.short_name,
//             c.is_completed,
//             c.content,
//             c.about,

//         -- Category object (all fields)
//         row_to_json(cat) AS category,

//         -- User object (all fields)
//         row_to_json(u) AS user,
//         c.created_at,
//         c.updated_at,
//         COUNT(uf.course_id) AS favorites_count
//         FROM user_favorites uf
//         JOIN courses c ON c.id = uf.course_id
//         LEFT JOIN categories cat ON cat.id = c.category_id
//         LEFT JOIN users u ON u.id = c.user_id
//         GROUP BY
//             c.id,
//             cat.*,
//             u.*
//         ORDER BY favorites_count DESC
//         LIMIT 6;
