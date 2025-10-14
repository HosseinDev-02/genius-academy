'use client'
import Link from "next/link";
import { useEffect, useState } from "react";


function Header() {
    // let localStorageValue = localStorage.getItem("theme");
    const [mobileMenuShow, setMobileMenuShow] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);
    // const [darkMode, setDarkMode] = useState(localStorageValue);
    const [showMobileCategoryMenu, setShowMobileCategoryMenu] = useState(false);
    const [showMobilePagesMenu, setShowMobilePagesMenu] = useState(false);
    const [showMobileCategorySubMenu, setShowMobileCategorySubMenu] =
        useState(false);
    const [userProfileShow, setUserProfileShow] = useState(false);
    const [loading, setLoading] = useState(true);

    // const themeHandler = () => {
    //     if (darkMode === "dark") {
    //         document.documentElement.classList.remove("dark");
    //         localStorage.setItem("theme", "light");
    //     } else {
    //         document.documentElement.classList.add("dark");
    //         localStorage.setItem("theme", "dark");
    //     }
    //     setDarkMode((prevStat) => {
    //         if (prevStat === "dark") {
    //             return "light";
    //         } else {
    //             return "dark";
    //         }
    //     });
    // };

    // useEffect(() => {
    //     console.log("theme changed");
    // }, [localStorageValue]);

    useEffect(() => {
        const handleLoad = () => setLoading(false);
        const handleDomReady = () => setLoading(false);

        window.addEventListener("load", handleLoad);
        document.addEventListener("DOMContentLoaded", handleDomReady);

        const timer = setTimeout(() => setLoading(false), 5000);

        return () => {
            window.removeEventListener("load", handleLoad);
            document.removeEventListener("DOMContentLoaded", handleDomReady);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            <header className="h-20 border-b border-b-border backdrop-blur-xl flex items-center justify-center bg-background/80 z-50 sticky left-0 right-0 top-0">
                <div className="container">
                    <nav className="flex items-center justify-between relative">
                        {/* header right side */}
                        <div className="flex items-center gap-3 lg:gap-8">
                            {/* header mobile menu btn */}
                            {/* <RoundButton
                                className={"flex lg:hidden"}
                                clickEvent={() => setMobileMenuShow(true)}
                                icon="#bars-3"
                            ></RoundButton> */}
                            {/* header logo */}
                            {/* <Logo></Logo> */}
                            {/* header menu */}
                            <ul className="hidden lg:flex items-center gap-5 font-YekanBakh-SemiBold text-sm child-hover:text-title child:transition-colors">
                                <li className="group/categories">
                                    <a
                                        className="flex items-center gap-1"
                                        href="/courses"
                                    >
                                        <span className="">
                                            دسته بندی آموزش ها
                                        </span>
                                        <svg className="w-5 h-5 group-hover/categories:rotate-180 transition-all">
                                            <use href="#chevron-down-mini"></use>
                                        </svg>
                                    </a>
                                    {/* header categories menu */}
                                    <ul className="invisible shadow opacity-0 group-hover/categories:visible group-hover/categories:opacity-100 absolute top-full bg-background border border-border w-56 flex flex-col gap-1 child:leading-5 delay-75 transition-all shadow-black/5 text-title z-20">
                                        <li className="group/subcategories">
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>فرانت اند</span>
                                                <svg className="w-5 h-5">
                                                    <use href="#chevron-left-mini"></use>
                                                </svg>
                                            </a>
                                            {/* header categories submenu */}
                                            <ul className="invisible shadow opacity-0 group-hover/subcategories:visible group-hover/subcategories:opacity-100 transition-all delay-75 flex flex-col flex-wrap space-y-3 px-3 pt-8 pb-3 bg-background border border-border w-96 absolute right-full -top-px -bottom-px text-caption text-sm">
                                                <li className="absolute top-2 font-YekanBakh-Bold pointer-events-none">
                                                    محبوب ترین موضوعات
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        جاوا اسکریپت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        نکست جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        انگیولار
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        تایپ اسکریپت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        ری اکت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        ویو جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        نود جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        جنگو
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        اکسپرس جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        پی اچ پی
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        لاراول
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        سی شارپ
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className="group/subcategories">
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>بک اند</span>
                                                <svg className="w-5 h-5">
                                                    <use href="#chevron-left-mini"></use>
                                                </svg>
                                            </a>
                                            {/* header categories submenu */}
                                            <ul className="invisible shadow opacity-0 group-hover/subcategories:visible group-hover/subcategories:opacity-100 transition-all delay-75 flex flex-col flex-wrap space-y-3 px-3 pt-8 pb-3 bg-background border border-border w-96 absolute right-full -top-px -bottom-px text-caption text-sm">
                                                <li className="absolute top-2 font-YekanBakh-Bold pointer-events-none">
                                                    محبوب ترین موضوعات
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        نود جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        جنگو
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        اکسپرس جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        پی اچ پی
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        لاراول
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        سی شارپ
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        جاوا اسکریپت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        نکست جی اس
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        انگیولار
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        تایپ اسکریپت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        ری اکت
                                                    </a>
                                                </li>
                                                <li className="w-1/2">
                                                    <a
                                                        className='relative before:w-1 before:h-1 before:bg-gray-600 before:rounded-full before:content-[""] before:inline-block flex items-center gap-2 before:right-0 before:top-0 before:bottom-0 before:my-auto hover:text-primary transition-colors hover:before:bg-primary'
                                                        href="#"
                                                    >
                                                        ویو جی اس
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>دیتاساینس</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>
                                                    زبانهای برنامه نویسی
                                                </span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>توسعه بازی</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center justify-between p-3 hover:text-primary transition-colors"
                                                href="#"
                                            >
                                                <span>برنامه نویسی موبایل</span>
                                            </a>
                                        </li>
                                    </ul>
                                </li>

                                <li className="group">
                                    <a
                                        className="flex items-center gap-1"
                                        href="/articles"
                                    >
                                        <span className="">مقالات آموزشی</span>
                                    </a>
                                </li>

                                <li className="group/categories">
                                    <a
                                        className="flex items-center gap-1"
                                        href="#"
                                    >
                                        <span className="">تمامی صفحات</span>
                                        <svg className="w-5 h-5 group-hover/categories:rotate-180 transition-all">
                                            <use href="#chevron-down-mini"></use>
                                        </svg>
                                    </a>
                                    {/* header categories menu */}
                                    <ul className="invisible shadow opacity-0 group-hover/categories:visible group-hover/categories:opacity-100 absolute top-full bg-background border border-border w-56 flex flex-col delay-75 p-3 transition-all shadow-black/5 text-title z-50 rounded-xl">
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/register"
                                            >
                                                ثبت نام
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/login"
                                            >
                                                ورود
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/courses"
                                            >
                                                دوره ها
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/articles"
                                            >
                                                مقاله ها
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/course-detail/react-js"
                                            >
                                                جزییات دوره
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/article-detail/backend-vs-frontend"
                                            >
                                                جزییات مقاله
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/dashboard/counter"
                                            >
                                                پنل کاربری
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                className="flex items-center justify-between px-3 py-2 hover:text-primary transition-colors text-xs"
                                                href="/orders"
                                            >
                                                سبد خرید
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                        {/* header left side */}
                        <div className="flex items-center gap-3 md:gap-5">
                            {/* header search btn */}
                            {/* <RoundButton
                                className={"hidden lg:flex cursor-pointer"}
                                clickEvent={() => setSearchModalShow(true)}
                                icon="#search"
                            ></RoundButton> */}
                            {/* modal search wrapper */}
                            <div
                                style={searchModalShow ? { top: "0" } : {}}
                                id="header-search-modal"
                                className="transition-all fixed left-0 right-0 -top-20 bg-background z-50 hidden lg:flex items-center justify-center h-20"
                            >
                                <div className="container">
                                    <div className="flex items-center justify-between gap-5">
                                        <form
                                            className="block w-full h-10"
                                            action="#"
                                        >
                                            {/* <Input
                                                element="input"
                                                className="placeholder:text-caption w-full h-full outline-none text-title bg-transparent"
                                                placeholder="نام دوره،مقاله و یا دسته بندی را وارد نمایید.."
                                                type="text"
                                            /> */}
                                        </form>
                                        {/* <RoundButton
                                            className="w-9 h-9 shrink-0 cursor-pointer"
                                            icon="#x-mark"
                                            clickEvent={() =>
                                                setSearchModalShow(false)
                                            }
                                        ></RoundButton> */}
                                    </div>
                                </div>
                            </div>
                            {/* header change theme btn */}
                            {/* <RoundButton
                                className={"hidden lg:flex cursor-pointer"}
                                clickEvent={themeHandler}
                                icon={`${
                                    localStorageValue === "dark"
                                        ? "#sun"
                                        : "#moon"
                                }`}
                            ></RoundButton> */}
                            {/* header basket btn */}
                            {/* <RoundButton
                                link={true}
                                href="/orders"
                                icon="#bag"
                                count={2}
                            ></RoundButton> */}
                            {/* header user profile btn */}

                            <div className="group/profile">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setUserProfileShow(
                                            (prevState) => !prevState
                                        )
                                    }
                                    className="flex items-center gap-3 cursor-pointer"
                                >
                                    {/* <RoundButton icon="#user"></RoundButton> */}
                                    <span className="hidden xs:flex flex-col gap-1 items-start text-xs pointer-events-none">
                                        <span className="text-title font-YekanBakh-SemiBold">
                                            حسین رستمی
                                        </span>
                                        <span className="font-YekanBakh-SemiBold">
                                            خوش آمـــدید
                                        </span>
                                    </span>
                                    <svg
                                        style={
                                            userProfileShow
                                                ? {
                                                      transform:
                                                          "rotate(180deg)",
                                                  }
                                                : {}
                                        }
                                        className="w-5 h-5 hidden xs:block transition-all"
                                    >
                                        <use href="#chevron-down-mini"></use>
                                    </svg>
                                </button>
                                {/* header user profile menu */}
                                <div
                                    id="user-profile"
                                    className={`rounded-xl shadow border border-border absolute top-full left-0 w-56 p-3 flex flex-col bg-background transition-all delay-75 child:transition-colors font-YekanBakh-SemiBold text-xs text-title ${
                                        userProfileShow
                                            ? "visible opacity-100 z-20"
                                            : "invisible opacity-0"
                                    }`}
                                >
                                    <a
                                        className="hover:text-primary flex items-center gap-2 py-2 px-3"
                                        href="/dashboard/counter"
                                    >
                                        <span>
                                            <svg className="w-5 h-5">
                                                <use href="#stars"></use>
                                            </svg>
                                        </span>
                                        <span>مشاهده پروفایل</span>
                                    </a>
                                    <Link
                                        className="hover:text-primary flex items-center gap-2 py-2 px-3"
                                        href="/dashboard/counter"
                                    >
                                        <span>
                                            <svg className="w-5 h-5">
                                                <use href="#setting"></use>
                                            </svg>
                                        </span>
                                        <span>پنل کاربری</span>
                                    </Link>
                                    <a
                                        className="hover:text-red-700 text-red-500 flex items-center gap-2 py-2 px-3"
                                        href="/login"
                                    >
                                        <span>
                                            <svg className="w-5 h-5">
                                                <use href="#logout"></use>
                                            </svg>
                                        </span>
                                        <span>خروج از حساب</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
            {/* Mobile Menu */}
            <div
                id="mobile-menu"
                className={`lg:hidden transition-all h-screen overflow-y-auto fixed top-0 bg-background rounded-tl-xl rounded-bl-xl w-72 xs:w-80 p-4 space-y-5 z-[100] ${
                    mobileMenuShow ? "right-0" : "-right-72 xs:-right-80"
                }`}
            >
                {/*  mobile menu header  */}
                <div className="flex items-center justify-between mb-8">
                    {/* <Logo></Logo> */}
                    <span
                        onClick={() => setMobileMenuShow(false)}
                        className="text-title"
                    >
                        <svg className="w-6 h-6">
                            <use href="#x-mark"></use>
                        </svg>
                    </span>
                </div>
                {/*  mobile search box  */}
                <form
                    action="#"
                    className="rounded-xl flex items-center bg-secondary relative h-10 px-12 py-2 border border-border"
                >
                    <span className="absolute right-4 top-0 bottom-0 m-auto flex items-center justify-center text-title">
                        <svg className="w-5 h-5">
                            <use href="#search"></use>
                        </svg>
                    </span>
                    <input
                        placeholder="دنبال چی میگردی ؟"
                        className="w-full h-full bg-transparent outline-none text-title placeholder:text-caption text-sm"
                        type="text"
                    />
                </form>
                {/*  mobile change them wrapper  */}
                <label className="flex items-center justify-between border-y border-y-border py-4">
                    <span className="text-title font-YekanBakh-Bold text-sm">
                        تم تاریک
                    </span>
                    {/* <input
                        onChange={themeHandler}
                        className="peer sr-only"
                        type="checkbox"
                    /> */}
                    <div className="inline-block cursor-pointer border-2 border-zinc-200 dark:border-primary h-5 w-11 bg-white dark:bg-primary relative rounded-xl transition-all">
                        {/* <span
                            style={
                                darkMode === "dark"
                                    ? {
                                          transform: "translateX(26px)",
                                          backgroundColor: "#000",
                                      }
                                    : {}
                            }
                            className="w-3 h-3 bg-zinc-200 absolute left-0 translate-x-[2px] rounded-full top-0 bottom-0 my-auto transition-all"
                        ></span> */}
                    </div>
                </label>
                {/*  Mobile Menu Categories  */}
                <div>
                    <ul className="flex flex-col gap-5">
                        <li>
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    setShowMobileCategoryMenu(
                                        (prevState) => !prevState
                                    );
                                }}
                                className={`flex items-center justify-between ${
                                    showMobileCategoryMenu ? "text-title" : ""
                                }`}
                                href="#"
                            >
                                <span className="flex items-center gap-2">
                                    <span>
                                        <svg className="w-5 h-5">
                                            <use href="#bars-2"></use>
                                        </svg>
                                    </span>
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        دسته بندی آموزش ها
                                    </span>
                                </span>
                                <span>
                                    <svg
                                        className={`w-5 h-5 ${
                                            showMobileCategoryMenu &&
                                            "rotate-180"
                                        }`}
                                    >
                                        <use href="#chevron-down-mini"></use>
                                    </svg>
                                </span>
                            </a>
                            <ul
                                className={`child:py-2 ${
                                    showMobileCategoryMenu
                                        ? "inline-block"
                                        : "hidden"
                                } relative before:absolute before:content-[""] before:top-0 before:bottom-0 before:right-3 before:bg-zinc-200 dark:before:bg-zinc-900 before:h-full before:w-px pr-8 mt-4 child:text-xs text-zinc-400`}
                            >
                                <li>
                                    <a
                                        onClick={() => {
                                            setShowMobileCategorySubMenu(
                                                (prevState) => !prevState
                                            );
                                        }}
                                        className={`flex items-center gap-1 ${
                                            showMobileCategorySubMenu
                                                ? "text-title"
                                                : ""
                                        }`}
                                        href="#"
                                    >
                                        <svg
                                            className={`w-4 h-4 ${
                                                showMobileCategorySubMenu &&
                                                "-rotate-45"
                                            }`}
                                        >
                                            <use href="#chevron-left-mini"></use>
                                        </svg>
                                        فرانت اند
                                    </a>
                                    <ul
                                        style={
                                            showMobileCategorySubMenu
                                                ? {
                                                      display: "inline-block",
                                                  }
                                                : {}
                                        }
                                        className='child:py-2 relative before:absolute before:content-[""] before:top-0 before:bottom-0 before:right-3 before:bg-zinc-200 dark:before:bg-zinc-900 before:h-full before:w-px pr-8 mt-4 text-xs text-zinc-400 hidden'
                                    >
                                        <li>
                                            <a
                                                className="flex items-center gap-2"
                                                href="#"
                                            >
                                                <span className="w-2 h-px bg-border"></span>
                                                جاوااسکریپت
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center gap-2"
                                                href="#"
                                            >
                                                <span className="w-2 h-px bg-border"></span>
                                                نکست جی اس
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center gap-2"
                                                href="#"
                                            >
                                                <span className="w-2 h-px bg-border"></span>
                                                ری اکت
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                className="flex items-center gap-2"
                                                href="#"
                                            >
                                                <span className="w-2 h-px bg-border"></span>
                                                ویو حی اس
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <a
                                        className={`flex items-center gap-1`}
                                        href="#"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        بک اند
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className={`flex items-center gap-1`}
                                        href="#"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        دیتاساینس
                                    </a>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                onClick={(event) => {
                                    event.preventDefault();
                                    setShowMobilePagesMenu(
                                        (prevState) => !prevState
                                    );
                                }}
                                className={`flex items-center justify-between ${
                                    showMobilePagesMenu ? "text-title" : ""
                                }`}
                                href="#"
                            >
                                <span className="flex items-center gap-2">
                                    <span>
                                        <svg className="w-5 h-5">
                                            <use href="#papers"></use>
                                        </svg>
                                    </span>
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        تمامی صفحات
                                    </span>
                                </span>
                                <span>
                                    <svg
                                        className={`w-5 h-5 ${
                                            showMobilePagesMenu && "rotate-180"
                                        }`}
                                    >
                                        <use href="#chevron-down-mini"></use>
                                    </svg>
                                </span>
                            </a>
                            <ul
                                className={`child:py-2 ${
                                    showMobilePagesMenu
                                        ? "inline-block"
                                        : "hidden"
                                } relative before:absolute before:content-[""] before:top-0 before:bottom-0 before:right-3 before:bg-zinc-200 dark:before:bg-zinc-900 before:h-full before:w-px pr-8 mt-4 child:text-xs text-zinc-400`}
                            >
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/courses"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        دوره ها
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/articles"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        مقاله ها
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/course-detail/react-js"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        جزییات دوره
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/article-detail/backend-vs-frontend"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        جزییات مقاله
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/orders"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        سبد خرید
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/register"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        ثبت نام
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/login"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        ورود
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className={`flex items-center gap-1`}
                                        href="/dashboard/counter"
                                    >
                                        <span className="w-2 h-px bg-border"></span>
                                        پنل کاربری
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <a
                                className="flex items-center justify-between"
                                href="/articles"
                            >
                                <span className="flex items-center gap-2">
                                    <span>
                                        <svg className="w-5 h-5">
                                            <use href="#document-text"></use>
                                        </svg>
                                    </span>
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        مقالات آموزشی
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a
                                className="flex items-center justify-between"
                                href="/register"
                            >
                                <span className="flex items-center gap-2">
                                    <span>
                                        <svg className="w-5 h-5">
                                            <use href="#login"></use>
                                        </svg>
                                    </span>
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        ورود / ثبت نام
                                    </span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            {/*  mobile menu cover elem  */}
            {/*  Courses Filtering Menu Cover  */}
            {/* {mobileMenuShow && (
                <Cover className="z-50" setElemStatus={setMobileMenuShow} />
            )} */}

            {/* {loading && (
                <div className="fixed inset-0 m-auto bg-black/90 flex items-center justify-center z-[19999]">
                    <Loader
                        emptyColor="rgb(var(--color-secondary))"
                        filledColor="rgb(var(--color-primary))"
                        className="page-loader"
                    />
                </div>
            )} */}
        </>
    );
}

export default Header;
