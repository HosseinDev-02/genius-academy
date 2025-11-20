'use client';
import React from "react";
import Input from "./Input";
import RoundButton from "./button/RoundButton";
import { LucideSearch, LucideX } from "lucide-react";

export default function HeaderSearchBox() {
    const [searchModalShow, setSearchModalShow] = React.useState(false);

    return (
        <div>
            {/* header search btn */}
            <RoundButton
                className={"hidden lg:flex cursor-pointer"}
                clickEvent={() => setSearchModalShow(true)}
                icon={<LucideSearch size={20} />}
            ></RoundButton>
            {/* modal search wrapper */}
            <div
                style={searchModalShow ? { top: "0" } : {}}
                id="header-search-modal"
                className="transition-all fixed left-0 right-0 -top-20 bg-background z-50 hidden lg:flex items-center justify-center h-20"
            >
                <div className="container">
                    <div className="flex items-center justify-between gap-5">
                        <form className="block w-full h-10" action="#">
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
                            icon={<LucideX size={20} />}
                            clickEvent={() => setSearchModalShow(false)}
                        ></RoundButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
