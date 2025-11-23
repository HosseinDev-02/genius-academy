'use client';
import {
    LucideShoppingCart,
} from "lucide-react";
import UserProfile from "../ui/user/UserProfile";
import ThemeToggleButton from "../ui/button/ThemeToggleButton";
import RoundButton from "../ui/button/RoundButton";
import Logo from "../ui/Logo";
import MobileMenu from "../ui/Menu/MobileMenu";
import HeaderSearchBox from "../ui/HeaderSearchBox";
import MobileMenuButton from "../ui/Menu/MobileMenuButton";
import Menu from "../ui/Menu/Menu";
import { MenuTree, getMenuTree } from "@/src/lib/storage/menu-tree";
import { useEffect, useState } from "react";

function Header() {
    // const menuTree = await getMenuTree();

    // let localStorageValue = localStorage.getItem("theme");
    // const [darkMode, setDarkMode] = useState("light");
    // const [loading, setLoading] = useState(true);
    const [menuTree, setMenuTree] = useState<MenuTree[] | []>([]);

    useEffect(() => {
        const fetchMenuTree = async () => {
            const response = await fetch('/api/menus/menuTree');
            const result = await response.json()
            console.log('menu :', result);
            setMenuTree(result)
        }
        fetchMenuTree()
    }, [])

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

    //     const handleLoad = () => setLoading(false);
    //     const handleDomReady = () => setLoading(false);

    //     window.addEventListener("load", handleLoad);
    //     document.addEventListener("DOMContentLoaded", handleDomReady);

    //     const timer = setTimeout(() => setLoading(false), 5000);

    //     return () => {
    //         window.removeEventListener("load", handleLoad);
    //         document.removeEventListener("DOMContentLoaded", handleDomReady);
    //         clearTimeout(timer);
    //     };
    // }, []);

    return (
        <>
            <header className="h-20 border-b border-b-border backdrop-blur-xl flex items-center justify-center bg-background/80 z-50 sticky left-0 right-0 top-0">
                <div className="container">
                    <nav className="flex items-center justify-between relative">
                        {/* header right side */}
                        <div className="flex items-center gap-3 lg:gap-8">
                            {/* header mobile menu btn */}
                            <MobileMenuButton/>
                            {/* header logo */}
                            <Logo />
                            {/* Header Menu */}
                            <Menu data={menuTree}/>
                        </div>
                        {/* header left side */}
                        <div className="flex items-center gap-3 md:gap-5">
                            <HeaderSearchBox/>
                            {/* header change theme btn */}
                            <ThemeToggleButton type="desktop"/>
                            {/* header basket btn */}
                            <RoundButton
                                href="/shopping-cart"
                                icon={<LucideShoppingCart size={20} />}
                                count={2}
                            ></RoundButton>
                            {/* header user profile btn */}
                            <UserProfile />
                        </div>
                    </nav>
                </div>
            </header>
            {/* Mobile Menu */}
            <MobileMenu data={menuTree}/>
            {/*  mobile menu cover elem  */}
            
        </>
    );
}

export default Header;
