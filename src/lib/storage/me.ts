'use server';

import { cookies } from "next/headers";
import { User } from "../type-definition";
import jwt from "jsonwebtoken";
import { sql } from "@/src/db";


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
