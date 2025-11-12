"use server";
import { neon } from "@neondatabase/serverless";
import { Timestamp } from "next/dist/server/lib/cache-handlers/types";
import { sql } from "../db";
import {
    Article,
    ArticleWithRelations,
    CommentWithRelations,
    CourseWithRelations,
    SubMenuWithRelations,
    SubSubmenuWithRelations,
} from "./type-definition";

// console.log(sql)

type Course = {
    id: string;
    about: string;
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

export async function getAllCourses(): Promise<CourseWithRelations[]> {
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
        return data as unknown as CourseWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getShortCourses(): Promise<Course[]> {
    try {
        const data = await sql`SELECT * FROM courses ORDER BY created_at DESC`;
        return data as Course[];
    }catch(error) {
        console.log(error)
        return []
    }
}

export async function getCourseByShortName(shortName: string): Promise<CourseWithRelations | {}>{
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
          WHERE c.short_name = ${shortName} ORDER BY c.created_at DESC`;
        return data[0] as unknown as CourseWithRelations;
    } catch (error) {
        console.error(error);
        return {};
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

export async function getAllArticles(): Promise<ArticleWithRelations[]> {
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
        return data as unknown as ArticleWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getShortArticles(): Promise<Article[]> {
    try {
        const data = await sql`SELECT * FROM articles ORDER BY created_at DESC`;
        return data as unknown as Article[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllSubmenus(): Promise<SubMenuWithRelations[]> {
    try {
        const data = await sql`
        SELECT 
        s.id,
        s.title,
        s.url,
        s.order_index,
        s.created_at,
        s.updated_at,
        json_build_object(
          'id', m.id,
          'title', m.title,
          'url', m.url
        ) AS menu
      FROM submenus s
      JOIN menus m ON s.menu_id = m.id
      ORDER BY s.created_at DESC;`;
        return data as unknown as SubMenuWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllSubSubmenus(): Promise<SubSubmenuWithRelations[]> {
    try {
        const data = await sql`
        SELECT 
        s.id,
        s.title,
        s.url,
        s.order_index,
        s.created_at,
        s.updated_at,
        json_build_object(
          'id', m.id,
          'title', m.title,
          'url', m.url
        ) AS submenu
      FROM sub_submenus s
      JOIN submenus m ON s.submenu_id = m.id
      ORDER BY s.created_at DESC;`;
        return data as unknown as SubSubmenuWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllComments(): Promise<CommentWithRelations[]> {
    try {
        const data = await sql`
        SELECT 
        comment.id,
        comment.content,
        comment.created_at,
        comment.updated_at,
        comment.status,
        json_build_object(
        'id', u.id,
        'name', u.name,
        'image', u.image
        ) AS user,
        json_build_object('id', pu.id, 'name', pu.name) AS parent_user,
        CASE
            WHEN comment.course_id IS NOT NULL THEN json_build_object('id', c.id,'title', c.title,'image', c.image,'short_name', c.short_name)
        ELSE NULL
            END AS course,
        CASE
            WHEN comment.article_id IS NOT NULL THEN json_build_object('id', a.id,'title', a.title,'image', a.image,'short_name', a.short_name) 
        ELSE NULL
            END AS article
        FROM comments comment
        JOIN users u ON comment.user_id = u.id
        LEFT JOIN courses c ON comment.course_id = c.id
        LEFT JOIN articles a ON comment.article_id = a.id
        LEFT JOIN comments p ON p.id = comment.parent_id
        LEFT JOIN users pu ON pu.id = p.user_id
        ORDER BY comment.created_at DESC;
        `;
        return data as unknown as CommentWithRelations[];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAdminUsers(): Promise<User[]> {
    try {
        const data = await sql`SELECT * FROM users WHERE role != 'user' ORDER BY created_at DESC`;
        return data as unknown as User[];
    } catch (error) {
        console.error(error);
        return [];
    }
}
