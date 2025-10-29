import { fakeCategories, fakeCourses, fakeUsers } from "@/src/lib/fake-data";
import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import bcrypt from "bcryptjs";
const sql = neon(process.env.DATABASE_URL!);

console.log("DATABASE_URL:", process.env.DATABASE_URL);

async function seedCourses() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
    CREATE TABLE IF NOT EXISTS courses (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
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
        INSERT INTO categories (title)
        VALUES (${category.title})
        ON CONFLICT (id) DO NOTHING;
        `
        )
    );

    return insertedCategories;
}

async function seedUsers() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    await sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone_number VARCHAR(20),
    role VARCHAR(50) DEFAULT 'user',
    image TEXT,
    about TEXT,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;
    const insertedUsers = await Promise.all(
        fakeUsers.map(async (user) => {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            return sql`
          INSERT INTO users (name, email, password, phone_number, role, image, about)
          VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.phone_number}, ${user.role}, ${user.image}, ${user.about})
          ON CONFLICT (id) DO NOTHING;
        `;
        })
    );

    return insertedUsers;
}

export async function GET() {
    try {
        // await seedCategories();
        // await seedCourses();
        // await seedUsers();
        return Response.json({ message: "Database seeded successfully" });
    } catch (error) {
        return Response.json({ error }, { status: 500 });
    }
}
