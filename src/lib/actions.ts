"use server";
import { neon } from "@neondatabase/serverless";
const sql = neon(process.env.DATABASE_URL!);

// console.log(sql)

type Course = {
    title: string;
    category_id: string;
    price: number;
    image?: any;
    user_id: string;
    short_name: string;
    is_completed: boolean;
};

async function createCourse(data: Course) {
    const {
        title,
        category_id,
        price,
        image,
        user_id,
        short_name,
        is_completed,
    } = data;

    console.log("data send to create course", data);

    try {
        //       await sql`
        //   INSERT INTO courses (title, category_id, price, image, user_id, short_name, is_completed)
        //   VALUES (${title}, ${category_id}, ${price}, ${image.file[0].name}, ${user_id}, ${short_name}, ${is_completed})
        // `;
    } catch (error) {
        console.log(error);
        return {
            message: "DATABASE ERROR WHILE CREATING COURSE",
        };
    }
}

async function getAllCategories() {
    try {
        const data = sql`
          SELECT * FROM categories`;
        return data;
    } catch (error) {
        return {
            message: "DATABASE ERROR WHILE GETTING CATEGORIES",
        };
    }
}

export { getAllCategories };
