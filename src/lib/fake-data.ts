export const fakeCategories = [
    {
        id: 1,
        title: 'اندروید'
    },
    {
        id: 2,
        title: 'فرانت اند'
    },
    {
        id: 3,
        title: 'بک اند'
    },
    {
        id: 4,
        title: 'امنیت'
    },
]
export const fakeCourses = [
    {
        id: 1,
        title: "آموزش فلاتر از صفر",
        price: 1_990_000,
        image: "/images/Courses/03.jpg",
        category_id: fakeCategories[0].id,
    },
    {
        id: 2,
        title: "آموزش پروژه محور ری اکت و نکست",
        price: 1_560_000,
        image: "/images/Courses/01.jpg",
        category_id: fakeCategories[1].id,
    },
    {
        id: 3,
        title: "قدم صفر برنامه نویسی",
        price: 0,
        image: "/images/Courses/02.jpg",
        category_id: fakeCategories[2].id,
    },
    {
        id: 4,
        title: "آموزش ساخت ربات تلگرام با لاراول",
        price: 890_000,
        image: "/images/Courses/laravel.jpg",
        category_id: fakeCategories[0].id,
    },
]

export const fakeArticles = [
    {
        id: 1,
        title: "تفاوت بک اند و فرانت اند",
        img: "/images/Articles/backend-vs-frontend.jpg",
        time: "20:00",
        category: fakeCategories[0].id,
        href: "#",
        author_id: 1,
    },
    {
        id: 2,
        title: "Sass چیست ؟",
        img: "/images/Articles/sass.jpg",
        time: "15:00",
        category: fakeCategories[2].id,
        href: "#",
        author_id: 1,
    },
    {
        id: 3,
        title: "کار با توابع در جاوااسکریپت",
        img: "/images/Articles/functions.jpg",
        time: "32:00",
        category: fakeCategories[1].id,
        href: "#",
        author_id: 1,
    },
    {
        id: 4,
        title: "تفاوت جاوااسکریپت و اکمااسکریپت",
        img: "/images/Articles/js-vs-ecma.jpg",
        time: "10:00",
        category: fakeCategories[1].id,
        href: "#",
        author_id: 1,
    },
]

export const fakeUsers = [
    {
        id: 1,
        name: 'حسین رستمی',
        about: 'سلام حسین رستمی هستم توسعه دهنده فرانت اند',
        password: '1234',
        email: 'example@gmail.com',
        phone_number: '09123456789',
        image: '/images/profile.jpeg',
        role: 'author',
    },
    {
        id: 2,
        name: 'پرهام بیات',
        about: 'سلام پرهام بیات هستم توسعه دهنده فرانت اند',
        password: '1111',
        email: 'example2@gmail.com',
        phone_number: '09127566666',
        image: '/images/profile.jpeg',
        role: 'user',
    },
    {
        id: 3,
        name: 'محسن رستمی',
        about: 'سلام محسن رستمی هستم توسعه دهنده فرانت اند',
        password: '1234',
        email: 'example3@gmail.com',
        phone_number: '09125467789',
        image: '/images/profile.jpeg',
        role: 'teacher',
    },
    {
        id: 4,
        name: 'علی مشعورا',
        about: 'سلام علی مشعورا هستم توسعه دهنده فرانت اند',
        password: '1234',
        email: 'example4@gmail.com',
        phone_number: '09900090123',
        image: '/images/profile.jpeg',
        role: 'teacher',
    },
    {
        id: 5,
        name: 'سینا بی نظیر',
        about: 'سلام سینا بی نظیر هستم توسعه دهنده فرانت اند',
        password: '1234',
        email: 'example5@gmail.com',
        phone_number: '09995564545',
        image: '/images/profile.jpeg',
        role: 'teacher',
    },
]