import { sql } from "@/src/db";
import { Article, ArticleWithRelations } from "../type-definition";
import { unstable_cache } from "next/cache";

export const getAllArticles = unstable_cache(
    async (): Promise<ArticleWithRelations[]> => {
        try {
            const data = await sql`SELECT 
            a.id,
            a.title,
            a.time_read,
            a.image,
            a.short_name,
            a.content,
            a.about,
            a.created_at,
            a.updated_at,
            to_jsonb(cat) AS category,
            to_jsonb(u) AS author
            FROM articles a
            JOIN categories cat ON a.category_id = cat.id
            JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC;`;
            return data as unknown as ArticleWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["articles"],
    {
        revalidate: 10,
        tags: ["articles"],
    }
);

export const getShortArticles = unstable_cache(
    async (): Promise<Article[]> => {
        try {
            const data =
                await sql`SELECT * FROM articles ORDER BY created_at DESC`;
            return data as unknown as Article[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["articles"],
    {
        revalidate: 10,
        tags: ["articles"],
    }
);

export const getLatestArticles = unstable_cache(
    async () => {
        try {
            const data = await sql`
            SELECT 
            a.id,
            a.title,
            a.time_read,
            a.image,
            a.short_name,
            a.content,
            a.about,
            a.created_at,
            a.updated_at,
            to_jsonb(cat) AS category,
            to_jsonb(u) AS author
            FROM articles a
            JOIN categories cat ON a.category_id = cat.id
            JOIN users u ON a.user_id = u.id
            ORDER BY a.created_at DESC LIMIT 4;
            `;
            return data as unknown as ArticleWithRelations[];
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    ["articles"],
    {
        revalidate: 10,
        tags: ["articles"],
    }
);

export const getArticleByShortName = unstable_cache(
    async (shortName: string): Promise<ArticleWithRelations> => {
        try {
            const data = await sql`
            SELECT 
            a.id,
            a.title,
            a.image,
            a.short_name,
            a.content,
            a.about,
            to_jsonb(cat) AS category,
            to_jsonb(u) AS author
            FROM articles a
            JOIN categories cat ON a.category_id = cat.id
            JOIN users u ON a.user_id = u.id
            WHERE a.short_name = ${shortName}
            `;
            return data[0] as unknown as ArticleWithRelations;
        } catch (error) {
            console.error(error);
            return {} as ArticleWithRelations;
        }
    },
    ["articles"],
    {
        revalidate: 10,
        tags: ["articles"],
    }
);
