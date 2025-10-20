// 📘 نوع پایه‌ای برای هر آیتم منو
export interface BaseMenuItem {
    id: number;
    title: string;
    href: string;
}

// 📗 آیتمی که فقط لینک ساده است
export interface SimpleMenuItem extends BaseMenuItem {
    links?: never;
    subLinks?: never;
}

// 📙 آیتمی که زیرمنو (links) دارد
export interface MenuItemWithLinks extends BaseMenuItem {
    links: MenuItem[]; // آرایه‌ای از آیتم‌ها (ممکن است زیرمجموعه داشته باشند)
    subLinks?: never;
}

// 📒 آیتمی که دارای subLinks است
export interface MenuItemWithSubLinks extends BaseMenuItem {
    subLinks: MenuItem[];
    links?: never;
}

// 📚 ترکیب همه انواع ممکن
export type MenuItem =
    | SimpleMenuItem
    | MenuItemWithLinks
    | MenuItemWithSubLinks;

export type Icon = {
    width: number;
    height: number;
    color?: string;
    className?: string;
};

export type Course = {
    img: string;
    title: string;
    category: string;
    isCompleted: boolean;
    sections: string | number;
    time: string | number;
    teacher: string;
    teacherImg: string;
    isFree: boolean;
    offer: string | number;
    price: string | number;
    costPrice: string | number;
    href: string;
    id: string | number;
};

export type Article = {
    title: string;
    img: string;
    writer: string;
    writerImg: string;
    category: string;
    time: string | number;
    id: number | string;
    href: string;
    writerHref: string;
};

export type TFilteringCourse = {
    id: string | number;
    title: string;
};

export type ArticlesTag = {
    id: number;
    title: string;
    href: string;
};

export type CartProduct = {
    id: number | string;
    title: string;
    price: number;
    costPrice: number;
    isFree: boolean;
    time: number;
    sections: number;
    isCompleted: boolean;
    teacher: string;
    img: string;
    teacherImg: string;
    offer: number;
    href: string
};

export type UserPanelMenuLink = {
    id: number | string;
    title: string;
    href: string;
}
