import { MenuItem } from "./definition";

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

export const latestCourses = [
    {
        id: 1,
        title: 'آموزش فلاتر از صفر',
        price: 1_990_000,
        costPrice: 1_250_000,
        isFree: false,
        time: 25,
        sections: 12,
        isCompleted: false,
        teacher: 'حسین رستمی',
        img: '/images/Courses/03.jpg',
        teacherImg: '/images/profile.jpeg',
        category: 'اندروید',
        offer: 12,
        href: '#'
    },
    {
        id: 2,
        title: 'آموزش پروژه محور ری اکت و نکست',
        price: 1_560_000,
        costPrice: 0,
        isFree: false,
        time: 32,
        sections: 24,
        isCompleted: true,
        teacher: 'حسین رستمی',
        img: '/images/Courses/01.jpg',
        teacherImg: '/images/profile.jpeg',
        category: 'فرانت اند',
        offer: 0,
        href: '#'
    },
    {
        id: 3,
        title: 'قدم صفر برنامه نویسی',
        price: 0,
        costPrice: 0,
        isFree: true,
        time: 8,
        sections: 4,
        isCompleted: true,
        teacher: 'حسین رستمی',
        img: '/images/Courses/02.jpg',
        teacherImg: '/images/profile.jpeg',
        category: 'فرانت اند',
        offer: 0,
        href: '#'
    },
]
