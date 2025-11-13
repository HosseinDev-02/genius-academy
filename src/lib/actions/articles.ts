'use server';
import { sql } from "@/src/db";
import { Article, ArticleWithRelations } from "../type-definition";

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