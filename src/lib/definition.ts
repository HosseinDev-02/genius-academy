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
export type MenuItem = SimpleMenuItem | MenuItemWithLinks | MenuItemWithSubLinks;


export type Icon = {
    width: number,
    height: number,
    color?: string,
    className?: string
}
