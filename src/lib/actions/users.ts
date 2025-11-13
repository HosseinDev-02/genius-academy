'use server';
import { sql } from "@/src/db";
import { User } from "../type-definition";

export async function getAllTeachers(): Promise<User[]> {
    try {
        const data =
            await sql`SELECT * FROM users WHERE role = 'teacher' ORDER BY created_at DESC`;
        console.log(data);
        return data as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllUsers(): Promise<User[]> {
    try {
        const data = await sql`SELECT * FROM users ORDER BY created_at DESC`;
        return data as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAdminUsers(): Promise<User[]> {
    try {
        const data =
            await sql`SELECT * FROM users WHERE role != 'user' ORDER BY created_at DESC`;
        return data as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
