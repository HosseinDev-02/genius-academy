import { Article, Course, MenuItem } from "./definition";

export const menuItems: MenuItem[] = [
    {
        id: 1,
        title: "دسته بندی آموزش ها",
        href: "/courses",
        links: [
            {
                id: 1,
                title: "فرانت اند",
                href: "#",
                subLinks: [
                    {
                        id: 1,
                        title: "جاوا اسکریپت",
                        href: "#",
                    },
                    {
                        id: 2,
                        title: "نکست جی اس",
                        href: "#",
                    },
                    {
                        id: 3,
                        title: "انگیولار",
                        href: "#",
                    },
                    {
                        id: 4,
                        title: "تایپ اسکریپت",
                        href: "#",
                    },
                    {
                        id: 5,
                        title: "ری اکت",
                        href: "#",
                    },
                    {
                        id: 6,
                        title: "ویو جی اس",
                        href: "#",
                    },
                    {
                        id: 7,
                        title: "نود جی اس",
                        href: "#",
                    },
                    {
                        id: 8,
                        title: "جنگو",
                        href: "#",
                    },
                    {
                        id: 9,
                        title: "اکسپرس جی اس",
                        href: "#",
                    },
                    {
                        id: 10,
                        title: "پی اچ پی",
                        href: "#",
                    },
                    {
                        id: 11,
                        title: "لاراول",
                        href: "#",
                    },
                    {
                        id: 12,
                        title: "سی شارپ",
                        href: "#",
                    },
                ],
            },
            {
                id: 2,
                title: "بک اند",
                href: "#",
                subLinks: [
                    {
                        id: 1,
                        title: "جاوا اسکریپت",
                        href: "#",
                    },
                    {
                        id: 2,
                        title: "نکست جی اس",
                        href: "#",
                    },
                    {
                        id: 3,
                        title: "انگیولار",
                        href: "#",
                    },
                    {
                        id: 4,
                        title: "تایپ اسکریپت",
                        href: "#",
                    },
                    {
                        id: 5,
                        title: "ری اکت",
                        href: "#",
                    },
                    {
                        id: 6,
                        title: "ویو جی اس",
                        href: "#",
                    },
                    {
                        id: 7,
                        title: "نود جی اس",
                        href: "#",
                    },
                    {
                        id: 8,
                        title: "جنگو",
                        href: "#",
                    },
                    {
                        id: 9,
                        title: "اکسپرس جی اس",
                        href: "#",
                    },
                    {
                        id: 10,
                        title: "پی اچ پی",
                        href: "#",
                    },
                    {
                        id: 11,
                        title: "لاراول",
                        href: "#",
                    },
                    {
                        id: 12,
                        title: "سی شارپ",
                        href: "#",
                    },
                ],
            },
            {
                id: 3,
                title: "دیتاساینس",
                href: "#",
            },
            {
                id: 4,
                title: "زبانهای برنامه نویسی",
                href: "#",
            },
            {
                id: 5,
                title: "توسعه بازی",
                href: "#",
            },
            {
                id: 6,
                title: "برنامه نویسی موبایل",
                href: "#",
            },
        ],
    },
    {
        id: 2,
        title: "مقالات آموزشی",
        href: "/articles",
    },
    {
        id: 3,
        title: "تمامی صفحات",
        href: "#",
        links: [
            {
                id: 1,
                title: "ثبت نام",
                href: "/register",
            },
            {
                id: 2,
                title: "ورود",
                href: "/login",
            },
            {
                id: 3,
                title: "دوره ها",
                href: "/courses",
            },
            {
                id: 4,
                title: "مقاله ها",
                href: "/articles",
            },
            {
                id: 5,
                title: "جزییات دوره",
                href: "/course-detail/react-js",
            },
            {
                id: 6,
                title: "جزییات مقاله",
                href: "/article-detail/backend-vs-frontend",
            },
            {
                id: 7,
                title: "پنل کاربری",
                href: "/dashboard/counter",
            },
            {
                id: 8,
                title: "سبد خرید",
                href: "/orders",
            },
        ],
    },
];

export const userProfileItems = [
    {
        id: 1,
        title: "مشاهده پروفایل",
        href: "/dashboard/counter",
    },
    {
        id: 2,
        title: "پنل کاربری",
        href: "/dashboard/counter",
    },
    {
        id: 3,
        title: "خروج از حساب",
        href: "/login",
    },
];

export const services = [
    {
        id: 1,
        title: "چالش برانگیز",
    },
    {
        id: 2,
        title: "پروژه محور",
    },
    {
        id: 3,
        title: "جامع",
    },
    {
        id: 4,
        title: "به روز",
    },
    {
        id: 5,
        title: "ویدیویی",
    },
    {
        id: 6,
        title: "منتورشیپ",
    },
];

export const courses: Course[] = [
    {
        id: 1,
        title: "آموزش فلاتر از صفر",
        price: 1_990_000,
        costPrice: 1_250_000,
        isFree: false,
        time: 25,
        sections: 12,
        isCompleted: false,
        teacher: "حسین رستمی",
        img: "/images/Courses/03.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "اندروید",
        offer: 12,
        href: "#",
    },
    {
        id: 2,
        title: "آموزش پروژه محور ری اکت و نکست",
        price: 1_560_000,
        costPrice: 0,
        isFree: false,
        time: 32,
        sections: 24,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/01.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 3,
        title: "قدم صفر برنامه نویسی",
        price: 0,
        costPrice: 0,
        isFree: true,
        time: 8,
        sections: 4,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/02.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 4,
        title: "آموزش ساخت ربات تلگرام با لاراول",
        price: 890_000,
        costPrice: 760_000,
        isFree: false,
        time: 12,
        sections: 5,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/laravel.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "اندروید",
        offer: 12,
        href: "#",
    },
    {
        id: 5,
        title: "دوره آموزش Redux",
        price: 1_000_000,
        costPrice: 0,
        isFree: false,
        time: 16,
        sections: 18,
        isCompleted: false,
        teacher: "حسین رستمی",
        img: "/images/Courses/redux.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 6,
        title: "دوره آموزش TailwindCss",
        price: 0,
        costPrice: 0,
        isFree: true,
        time: 15,
        sections: 7,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/tailwind.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 7,
        title: "آموزش کامل VsCode",
        price: 0,
        costPrice: 0,
        isFree: true,
        time: 2,
        sections: 1,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/vscode.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 8,
        title: "آموزش جامع ووکامرس",
        price: 650_000,
        costPrice: 0,
        isFree: false,
        time: 12,
        sections: 4,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/woocommerce.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
];

export const latestCourses: Course[] = [
    {
        id: 1,
        title: "آموزش فلاتر از صفر",
        price: 1_990_000,
        costPrice: 1_250_000,
        isFree: false,
        time: 25,
        sections: 12,
        isCompleted: false,
        teacher: "حسین رستمی",
        img: "/images/Courses/03.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "اندروید",
        offer: 12,
        href: "#",
    },
    {
        id: 2,
        title: "آموزش پروژه محور ری اکت و نکست",
        price: 1_560_000,
        costPrice: 0,
        isFree: false,
        time: 32,
        sections: 24,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/01.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
    {
        id: 3,
        title: "قدم صفر برنامه نویسی",
        price: 0,
        costPrice: 0,
        isFree: true,
        time: 8,
        sections: 4,
        isCompleted: true,
        teacher: "حسین رستمی",
        img: "/images/Courses/02.jpg",
        teacherImg: "/images/profile.jpeg",
        category: "فرانت اند",
        offer: 0,
        href: "#",
    },
];

export const latestArticles: Article[] = [
    {
        id: 1,
        title: "تفاوت بک اند و فرانت اند",
        img: "/images/Articles/backend-vs-frontend.jpg",
        time: "20:00",
        writer: "حسین رستمی",
        writerImg: "/images/profile.jpeg",
        category: "فرانت اند",
        href: "#",
        writerHref: "#",
    },
    {
        id: 2,
        title: "Sass چیست ؟",
        img: "/images/Articles/sass.jpg",
        time: "15:00",
        writer: "حسین رستمی",
        writerImg: "/images/profile.jpeg",
        category: "فرانت اند",
        href: "#",
        writerHref: "#",
    },
    {
        id: 3,
        title: "کار با توابع در جاوااسکریپت",
        img: "/images/Articles/functions.jpg",
        time: "32:00",
        writer: "حسین رستمی",
        writerImg: "/images/profile.jpeg",
        category: "فرانت اند",
        href: "#",
        writerHref: "#",
    },
    {
        id: 4,
        title: "تفاوت جاوااسکریپت و اکمااسکریپت",
        img: "/images/Articles/js-vs-ecma.jpg",
        time: "10:00",
        writer: "حسین رستمی",
        writerImg: "/images/profile.jpeg",
        category: "بک اند",
        href: "#",
        writerHref: "#",
    },
];

export const useFullLinks = [
    {
        id: 1,
        title: "قوانین و مقررات",
        href: "#",
    },
    {
        id: 2,
        title: "مدرسان",
        href: "#",
    },
    {
        id: 3,
        title: "درباره نابغه",
        href: "#",
    },
    {
        id: 4,
        title: "ارتباط با ما",
        href: "#",
    },
];

export const socialMediaLinks = [
    {
        id: 1,
        title: "telegram",
        href: "#",
    },
    {
        id: 2,
        title: "instagram",
        href: "#",
    },
    {
        id: 3,
        title: "youtube",
        href: "#",
    },
];

export const courseTypes = [
    { id: 1, title: "پولی" },
    { id: 2, title: "رایگان" },
    { id: 3, title: "همه" },
];

export const courseCategories = [
    { id: 1, title: "فرانت اند" },
    { id: 2, title: "بک اند" },
    { id: 3, title: "اندروید" },
];

export const sortingCoursesTypes = [
    { id: 1, title: "جدیدترین" },
    { id: 2, title: "پرفروش ترین" },
    { id: 3, title: "گران ترین" },
    { id: 4, title: "ارزان ترین" },
];
