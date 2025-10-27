import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL!)

async function getCategoryCourseById(categoryId: number) {
    const result = await sql`
    SELECT *
    FROM categories
    WHERE id = ${categoryId};
  `;

  // چون فقط یه نتیجه می‌خوایم، خروجی آبجکت تکیه
  return result[0] || null;
}


export { getCategoryCourseById }