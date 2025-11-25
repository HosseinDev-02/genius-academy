import { sql } from "@/src/db";
import { User } from "../type-definition";
import { unstable_cache } from "next/cache";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

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
        tags: ["users"],
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

export const getMe = async (): Promise<User | null> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth_token")?.value;

        let decoded: any = null;

        if (!token) {
            throw new Error("Unauthorized: No token provided");
        }

        decoded = jwt.verify(token, process.env.JWT_SECRET!);

        const rows =
            await sql`SELECT * FROM users WHERE id = ${decoded.id} LIMIT 1`;

        if (rows.length === 0) {
            throw new Error("User not found");
        }

        return rows[0] as unknown as User;
    } catch (error) {
        console.log(error);
        return null;
    }
};
