"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import Logo from "../Logo/Logo";
import RoundButton from "../Buttons/RoundButton";
import {
    LucideMenu,
    LucideMoon,
    LucideSearch,
    LucideShoppingCart,
    LucideX,
} from "lucide-react";
import UserProfile from "./UserProfile";
import Input from "../Form/Input";
import Cover from "../Cover/Cover";
import MobileMenu from "../Menu/MobileMenu";
import ThemeToggleButton from "./ThemeToggleButton";

function Header() {
    // let localStorageValue = localStorage.getItem("theme");
    const [mobileMenuShow, setMobileMenuShow] = useState(false);
    const [searchModalShow, setSearchModalShow] = useState(false);
    const [darkMode, setDarkMode] = useState("light");
    const [showMobileCategoryMenu, setShowMobileCategoryMenu] = useState(false);
    const [showMobilePagesMenu, setShowMobilePagesMenu] = useState(false);
    const [showMobileCategorySubMenu, setShowMobileCategorySubMenu] =
        useState(false);
    const [loading, setLoading] = useState(true);

    const themeHandler = () => {
        if (darkMode === "dark") {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        } else {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        }
        setDarkMode((prevStat) => {
            if (prevStat === "dark") {
                return "light";
            } else {
                return "dark";
            }
        });
    };

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
                            <RoundButton
                                className={"flex lg:hidden"}
                                clickEvent={() => setMobileMenuShow(true)}
                                icon={() => <LucideMenu size={20} />}
                            ></RoundButton>
                            {/* header logo */}
                            <Logo />
                            {/* Header Menu */}
                            <Menu />
                        </div>
                        {/* header left side */}
                        <div className="flex items-center gap-3 md:gap-5">
                            {/* header search btn */}
                            <RoundButton
                                className={"hidden lg:flex cursor-pointer"}
                                clickEvent={() => setSearchModalShow(true)}
                                icon={() => <LucideSearch size={20} />}
                            ></RoundButton>
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
                                            {/* Handle Search Logic When Add Courses Data To Project */}
                                            <Input
                                                element="input"
                                                className="placeholder:text-caption w-full h-full outline-none text-title bg-transparent"
                                                placeholder="نام دوره،مقاله و یا دسته بندی را وارد نمایید.."
                                                type="text"
                                            />
                                        </form>
                                        <RoundButton
                                            className="w-9 h-9 shrink-0 cursor-pointer"
                                            icon={() => <LucideX size={20} />}
                                            clickEvent={() =>
                                                setSearchModalShow(false)
                                            }
                                        ></RoundButton>
                                    </div>
                                </div>
                            </div>
                            {/* header change theme btn */}
                            <ThemeToggleButton type="desktop"/>
                            {/* header basket btn */}
                            <RoundButton
                                href="/orders"
                                icon={() => <LucideShoppingCart size={20} />}
                                count={2}
                            ></RoundButton>
                            {/* header user profile btn */}
                            <UserProfile />
                        </div>
                    </nav>
                </div>
            </header>
            {/* Mobile Menu */}
            <MobileMenu mobileMenuShow={mobileMenuShow} setMobileMenuShow={setMobileMenuShow}/>
            {/*  mobile menu cover elem  */}
            {/*  Courses Filtering Menu Cover  */}
            {mobileMenuShow && (
                <Cover className="z-50" setElemStatus={setMobileMenuShow} />
            )}

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
