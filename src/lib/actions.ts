"use server";
import { neon } from "@neondatabase/serverless";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { sql } from "../db";
import { Article } from "./type-definition";

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
            await sql`SELECT * FROM categories ORDER BY created_at DESC`;
        return data as unknown as Category[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllCourses(): Promise<Course[]> {
    try {
        const data = await sql`SELECT 
            c.id,
            c.title,
            c.price,
            c.image,
            c.short_name,
            c.is_completed,
            c.content,
            c.about,
            json_build_object(
              'id', cat.id,
              'title', cat.title,
              'short_name', cat.short_name
            ) AS category,
            json_build_object(
              'id', u.id,
              'name', u.name,
              'role', u.role,
              'image', u.image,
              'about', u.about
            ) AS user,
              c.created_at,
            c.updated_at
          FROM courses c
          JOIN categories cat ON c.category_id = cat.id
          JOIN users u ON c.user_id = u.id
          ORDER BY c.created_at DESC`;
        return data as unknown as Course[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function deleteCourseById(courseId: string) {
    try {
        await sql`DELETE FROM courses WHERE id=${courseId}`;
    } catch (error) {
        console.error(error);
    }
}

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

export async function getAllArticles(): Promise<Article[]> {
    try {
        const data = await sql`SELECT 
        a.id,
        a.title,
        a.time_read,
        a.image,
        a.short_name,
        a.content,
        a.about,
        json_build_object(
          'id', cat.id,
          'title', cat.title,
          'short_name', cat.short_name
        ) AS category,
        json_build_object(
          'id', u.id,
          'name', u.name,
          'role', u.role,
          'image', u.image,
          'about', u.about
        ) AS author,
          a.created_at,
        a.updated_at
      FROM articles a
      JOIN categories cat ON a.category_id = cat.id
      JOIN users u ON a.user_id = u.id
      ORDER BY a.created_at DESC;`;
        return data as unknown as Article[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
