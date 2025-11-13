import { sql } from "@/src/db";

export async function deleteCourseById(courseId: string) {
    try {
        await sql`DELETE FROM courses WHERE id=${courseId}`;
    } catch (error) {
        console.error(error);
    }
}