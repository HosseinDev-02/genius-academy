import { LogIn, LucideShoppingCart } from "lucide-react";
import UserProfile from "../ui/user/UserProfile";
import ThemeToggleButton from "../ui/button/ThemeToggleButton";
import RoundButton from "../ui/button/RoundButton";
import Logo from "../ui/Logo";
import HeaderSearchBox from "../ui/HeaderSearchBox";
import MobileMenuButton from "../ui/Menu/MobileMenuButton";
import MenuWrapper from "../ui/Menu/MenuWrapper";
import { cookies } from "next/headers";
import UserProfileWrapper from "../ui/user/UserProfileWrapper";
import PrimaryButton from "../ui/button/PrimaryButton";
import Cover from "../shared/Cover";
import SearchCover from "./SearchCover";

async function Header() {
    const cookiesStore = await cookies();
    const token = await cookiesStore.get("auth_token")?.value;
    return (
        <>
            <header className="h-20 border-b border-b-border backdrop-blur-xl flex items-center justify-center bg-background/80 z-50 sticky left-0 right-0 top-0">
                <div className="container">
                    <nav className="flex items-center justify-between relative">
                        {/* header right side */}
                        <div className="flex items-center gap-3 lg:gap-8">
                            {/* header mobile menu btn */}
                            <MobileMenuButton />
                            {/* header logo */}
                            <Logo />
                            {/* Header Menu */}
                            <MenuWrapper type="desktop" />
                        </div>
                        {/* header left side */}
                        <div className="flex items-center gap-3 md:gap-5">
                            <HeaderSearchBox />
                            {/* header change theme btn */}
                            <ThemeToggleButton type="desktop" />
                            {/* header basket btn */}
                            {token && (
                                <RoundButton
                                    href="/shopping-cart"
                                    icon={<LucideShoppingCart size={20} />}
                                    count={2}
                                />
                            )}
                            {/* header user profile btn */}
                            {token ? (
                                <UserProfileWrapper />
                            ) : (
                                <PrimaryButton
                                    href="/login"
                                    icon={<LogIn size={20} />}
                                    title="ورود/ثبت نام"
                                />
                            )}
                        </div>
                    </nav>
                </div>
            </header>
            {/* Mobile Menu */}
            <MenuWrapper type="mobile" />
            {/*  mobile menu cover elem  */}
            <SearchCover />
        </>
    );
}

export default Header;
