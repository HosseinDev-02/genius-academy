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

export type CourseWithRelations = Omit<Course, "category_id" | "user_id"> & {
    category: Category;
    user: User;
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
};

export type Menu = {
    id: string;
    title: string;
    url: string;
    order_index: number;
    created_at: Date;
    updated_at: Date;
};
export type SubMenu = {
    id: string;
    title: string;
    url: string;
    menu_id: string;
    order_index: number;
    created_at: Date;
    updated_at: Date;
};

export type SubMenuWithRelations = Omit<SubMenu, "menu_id"> & {
    menu: Menu;
};

export type SubSubmenu = {
    id: string;
    title: string;
    url: string;
    submenu_id: string;
    order_index: number;
    created_at: Date;
    updated_at: Date;
};

export type SubSubmenuWithRelations = Omit<SubSubmenu, "submenu_id"> & {
    submenu: SubMenu;
};

export type Comment = {
    id: string;
    content: string;
    course: Course;
    article: Article;
    user: User;
    parent_user: User;
    status: string;
    created_at: Date;
    updated_at: Date;
};

export type CommentWithRelations = Omit<Comment, "user_id"> & { user: User };

export type Session = {
    id: string;
    course_id: string;
    title: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export type SessionWithRelations = Omit<Session, "course_id"> & { course: Course }

