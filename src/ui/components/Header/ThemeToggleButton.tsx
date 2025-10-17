"use client";

import { ElementType, JSX, useEffect, useState } from "react";
import RoundButton from "../Buttons/RoundButton";
import { LucideMoon } from "lucide-react";
import { useTheme } from "next-themes";

type TThemeToggleButtonProps = {
    type: "mobile" | "desktop";
};

export default function ThemeToggleButton(props: TThemeToggleButtonProps) {
    const { type } = props;
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // از useEffect استفاده می‌کنیم تا فقط بعد از mount رندر نهایی انجام بشه
    useEffect(() => setMounted(true), []);

    if (!mounted) return null; // 👈 این خط باعث میشه در سرور اصلاً تم نمایش داده نشه

    const themeHandler = () => setTheme(theme === "dark" ? "light" : "dark");

    const setButton = () => {
        switch (type) {
            case "desktop":
                return (
                    <RoundButton
                        className={"hidden lg:flex cursor-pointer"}
                        clickEvent={themeHandler}
                        icon={() => <LucideMoon size={20} />}
                    ></RoundButton>
                );
            case "mobile":
                return (
                    <label className="flex items-center justify-between border-y border-y-border py-4">
                        <span className="text-title font-YekanBakh-Bold text-sm">
                            تم تاریک
                        </span>
                        <input
                            onChange={themeHandler}
                            className="peer sr-only"
                            type="checkbox"
                        />
                        <div className="inline-block cursor-pointer border-2 border-zinc-200 dark:border-primary h-5 w-11 bg-white dark:bg-primary relative rounded-xl transition-all">
                            <span
                                className={`w-3 h-3 absolute left-0 rounded-full top-0 bottom-0 my-auto transition-all ${
                                    theme === "dark"
                                        ? "translate-x-6.5 bg-black"
                                        : "translate-x-0.5 bg-zinc-200"
                                }`}
                            ></span>
                        </div>
                    </label>
                );
            default:
                return (
                    <RoundButton
                        className={"hidden lg:flex cursor-pointer"}
                        clickEvent={themeHandler}
                        icon={() => <LucideMoon size={20} />}
                    ></RoundButton>
                );
        }
    };

    return <>{setButton()}</>;
}
