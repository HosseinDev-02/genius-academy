export type Course = {
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

export type Category = {
    id: string;
    title: string;
    short_name: string;
    created_at: Date;
    updated_at: Date;
};

export type Article = {
    id: string;
    title: string;
    category_id: string;
    user_id: string;
    image: string;
    short_name: string;
    time_read: string;
    about: string;
    content: any;
    created_at: Date;
    updated_at: Date;
};

export type ArticleWithRelations = Omit<Article, "category_id" | "user_id"> & {
    category: Category;
    author: User;
};

export type Service = {
    id: string;
    title: string;
    key: string;
    created_at: Date;
    updated_at: Date;
}
