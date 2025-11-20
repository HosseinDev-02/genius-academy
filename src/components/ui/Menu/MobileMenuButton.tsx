"use client";
import React from "react";
import { useHeaderContext } from "../../layout/HeaderProvider";
import RoundButton from "../button/RoundButton";
import { LucideMenu } from "lucide-react";

export default function MobileMenuButton() {
    const { mobileMenuOpen } = useHeaderContext();
    const [showMobileMenu, setMobileMenuShow] = mobileMenuOpen;
    return (
        <RoundButton
            className={"flex lg:hidden"}
            clickEvent={() => setMobileMenuShow(true)}
            icon={<LucideMenu size={20} />}
        />
    );
}
