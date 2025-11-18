import { sql } from "@/src/db";
import { User } from "../type-definition";
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
    }
);
