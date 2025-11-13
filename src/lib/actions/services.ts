"use server";

import { sql } from "@/src/db";
import { Service } from "../type-definition";

export const getAllServices = async () => {
    try {
        const data = await sql`SELECT * FROM services ORDER BY created_at DESC`;
        return data as Service[];
    } catch (error) {
        return [];
    }
};
