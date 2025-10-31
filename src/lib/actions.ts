"use server";
import { neon } from "@neondatabase/serverless";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
const sql = neon(process.env.DATABASE_URL!);

// console.log(sql)

type Course = {
    title: string;
    category_id: string;
    price: number;
    image?: any;
    user_id: string;
    short_name: string;
    is_completed: boolean;
};

export type Category = {
    id: string;
    title: string;
    short_name: string;
    created_at: Date;
    updated_at: Date;
};

export type User = {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    password: string;
    about: string;
    role: string;
    image: string;
    created_at: Date;
    updated_at: Date;
};

async function createCourse(data: Course) {
    const {
        title,
        category_id,
        price,
        image,
        user_id,
        short_name,
        is_completed,
    } = data;

    console.log("data send to create course", data);

    try {
        //       await sql`
        //   INSERT INTO courses (title, category_id, price, image, user_id, short_name, is_completed)
        //   VALUES (${title}, ${category_id}, ${price}, ${image.file[0].name}, ${user_id}, ${short_name}, ${is_completed})
        // `;
    } catch (error) {
        console.log(error);
        return {
            message: "DATABASE ERROR WHILE CREATING COURSE",
        };
    }
}

export async function getAllCategories(): Promise<Category[]> {
    try {
        const data =
            await sql`SELECT * FROM categories ORDER BY created_at ASC`;
        return data as unknown as Category[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllTeachers(): Promise<User[]> {
    try {
        const data =
            await sql`SELECT * FROM users WHERE role = 'teacher' ORDER BY created_at DESC`;
            console.log(data)
        return data as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
