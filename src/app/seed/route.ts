import { fakeCategories, fakeCourses } from "@/src/lib/fake-data";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";

const sql = neon(process.env.DATABASE_URL!);

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function seedCourses() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS courses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      price DECIMAL(10, 2) NOT NULL,
      image TEXT
    );
  `;

    const insertedCourses = Promise.all(
        fakeCourses.map(
            (course) => sql`
    INSERT INTO courses (title, category_id, price, image)
    VALUES (${course.title}, ${course.category_id}, ${course.price}, ${course.image})
    ON CONFLICT (id) DO NOTHING;
    `
        )
    );

    return insertedCourses;
}

async function seedCategories() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS categories (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        title VARCHAR(255) NOT NULL
      );
    `;

    const insertedCategories = Promise.all(
        fakeCategories.map(
            (category) => sql`
        INSERT INTO categories (id, title)
        VALUES (${category.id}, ${category.title})
        ON CONFLICT (id) DO NOTHING;
        `
        )
    );

    return insertedCategories;
}

export async function GET() {
    try {
        await seedCategories();
        await seedCourses();

        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
