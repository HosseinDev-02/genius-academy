"use server";
import { neon } from "@neondatabase/serverless";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
const sql = neon(process.env.DATABASE_URL!);

// console.log(sql)

type Course = {
    id: string;
    title: string;
    category_id: string;
    price: number;
    image?: any;
    user_id: string;
    short_name: string;
    is_completed: boolean;
    created_at: Date;
    updated_at: Date;
    content: any;
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

export async function getAllCourses(): Promise<Course[]> {
    try {
        const data =
            await sql`SELECT * FROM courses ORDER BY created_at ASC`;
        return data as unknown as Course[];
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
