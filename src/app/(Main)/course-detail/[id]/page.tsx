import CommentsIcon from "@/src/components/icon/CommentsIcon";
import Box from "@/src/components/ui/Box";
import Session from "@/src/components/ui/Session";
import SubTitle from "@/src/components/ui/SubTitle";
import UserInfo from "@/src/components/ui/UserInfo";
import LikeButton from "@/src/components/ui/button/LikeButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SectionLinkBtn from "@/src/components/ui/section/SectionLinkBtn";
import { LucideArrowUpLeft, LucideClock, LucideCornerUpRight, LucideList, LucidePencil } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Page() {
    // const tabViewHandler = (e: React.MouseEvent<HTMLAnchorElement>) => {
    //     console.log(e.currentTarget.dataset.type);
    //     document.querySelector(".active-tab")?.classList.remove("active-tab");
    //     e.currentTarget.classList.add("active-tab");
    //     document
    //         .getElementById(e.currentTarget.dataset.type)
    //         ?.scrollIntoView({ behavior: "smooth" });
    // };

    return (
        <section className="py-5">
            <div className="container">
                <div className="flex md:flex-row flex-col md:items-start gap-5">
                    {/*  course detail right side  */}
                    <div className="md:w-8/12 pb-5">
                        {/*  course image  */}
                        <div>
                            <img
                                className="w-full rounded-3xl"
                                src="/images/Courses/01.jpg"
                                alt="دوره پروژه محور ری اکت و نکست"
                            />
                        </div>
                        {/*  course infos  */}
                        <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl space-y-2">
                            <span className="text-success text-xs font-YekanBakh-Bold">
                                تکمیل شده
                            </span>
                            <h1 className="text-title text-xl font-YekanBakh-Bold">
                                دوره پروژه محور ری اکت و نکست
                            </h1>
                            <p className="text-sm">
                                ساخت وبسایت فروشگاهی با React عنوان دوره پروژه
                                محور react در نابغه است که قصد داریم در قالب این
                                دوره react را در قالب پروژه به شما آموزش دهیم.
                            </p>
                        </div>
                        {/*  course detail boxes  */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 mt-5 gap-5">
                            {/* {boxes.map((box) => (
                                <Box key={box.id} {...box} />
                            ))} */}
                        </div>
                        {/*  course detail menu  */}
                        <div className="block md:inline-block bg-secondary border border-border rounded-3xl mt-10 p-1 z-10 sticky top-24 overflow-auto">
                            <ul className="inline-flex items-center gap-2">
                                <li>
                                    <button
                                        data-type="tabOne"
                                        // onClick={tabViewHandler}
                                        className="flex items-center gap-2 text-sm font-YekanBakh-SemiBold px-4 py-2 rounded-3xl text-title bg-background"
                                    >
                                        <LucidePencil size={20}/>
                                        <span className="text-nowrap">
                                            معرفی
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-type="tabTwo"
                                        // onClick={tabViewHandler}
                                        className="flex items-center gap-2 text-sm font-YekanBakh-SemiBold px-4 py-2 rounded-3xl"
                                    >
                                        <LucideList size={20}/>
                                        <span className="text-nowrap">
                                            سرفصل ها
                                        </span>
                                    </button>
                                </li>
                                <li>
                                    <button
                                        data-type="tabThree"
                                        // onClick={tabViewHandler}
                                        className="flex items-center gap-2 text-sm font-YekanBakh-SemiBold px-4 py-2 rounded-3xl"
                                    >
                                        <CommentsIcon width={20} height={20}/>
                                        <span className="text-nowrap">
                                            دیدگاه و پرسش
                                        </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/*  course detail description  */}
                        <div id="tabOne" className="space-y-5 my-5">
                            <SubTitle title="معرفی دوره"></SubTitle>
                            <p className="text-sm">
                                بدون شک در حال حاضر یکی از پرکاربردترین
                                فریمورک‌های جاوا اسکریپتی که می‌توانید در دنیای
                                وب پیدا بکنید React است. زمانی که یک فریمورک در
                                زمینه‌های مختلف کاربرد داشته باشد نیز در نهایت
                                باعث خواهد شد که فرصت‌های شغلی بسیار زیادی داشته
                                باشد. اما آیا فکر می‌کنید برای قبول شدن در یک
                                فرصت شغلی مناسب، تمام موارد لازم را در اختیار
                                دارید؟ اگر حس می‌کنید در رابطه با این قضیه مطمئن
                                نیستید و شک دارید، بهتر است با این دوره آموزشی
                                همراه باشید.
                            </p>
                            <div>
                                <h2 className="font-YekanBakh-Black mb-3 text-xl text-title">
                                    دوره پروژه محور ری اکت و نکست
                                </h2>
                                <div>
                                    <img
                                        className="w-full rounded-3xl"
                                        src="/images/Courses/01.jpg"
                                        alt="دوره پروژه محور ری اکت و نکست"
                                    />
                                </div>
                            </div>
                            <p className="text-sm">
                                زمانی که شما با موضوعات مختلف یک ابزار آشنایی
                                پیدا کردید، یک نکته مهم که باید در نظر داشته
                                باشید این است که چگونه با کنار هم قرار دادن
                                ویژگی‌های مختلف خواهید توانست یک پروژه واقعی را
                                ایجاد کنید. این موضوع دقیقا هدفی است که یک آموزش
                                پروژه محور دنبال می‌کند. در یک آموزش پروژه محور
                                در ابتدا شما به صورت مستقیم یا غیر مستقیم با
                                مفاهیم اولیه آشنا شده و سپس فرایند یادگیری
                                موضوعات جدید را در خلال ایجاد پروژه شروع خواهید
                                کرد.
                            </p>
                            <p className="text-sm">
                                منظور از غیر مستقیم بودن یادگیری مفاهیم اولیه
                                این است که در برخی از وبسایت‌های آموزشی از جمله
                                وبسایت آموزشی نابغه ما دوره‌های مقدماتی را پیشتر
                                ضبط کرده و از شما انتظار داریم که ابتدا آن‌ها را
                                به خوبی نگاه کرده و یاد گرفته باشید. به همین
                                دلیل است که ما در پایان نوشته‌های مربوط به هر
                                دوره یک قسمت اختصاصی به نام «پیش‌نیازها» را
                                ایجاد کرده و در آنجا خواهیم گفت که برای یادگیری
                                این دوره آموزشی نیاز خواهید داشت چه پیش‌نیازهایی
                                را در ابتدا طی کنید.
                            </p>
                            {/*  course structure  */}
                            <div>
                                <h3 className="text-lg text-title font-YekanBakh-Black mb-3">
                                    ساختار دوره آموزشی پروژه محور React
                                </h3>
                                <p className="text-sm">
                                    در ساختار این دوره مانند دوره‌های آموزشی
                                    دیگر، ما از یک سرفصل‌بندی جامع و دقیق
                                    استفاده خواهیم کرد. در ادامه ما سعی می‌کنیم
                                    این ساختار را به صورت تمام و کمال به شما
                                    معرفی کنیم. هدف از انجام این کار نیز آشنایی
                                    هر چه بیشتر شما با این دوره آموزشی است. در
                                    اولین دوره این دوره نیز از ساختار دوره
                                    صحبت‌های بسیاری شده و می‌توانید از آن نیز
                                    استفاده کنید.
                                </p>
                            </div>
                        </div>
                        {/*  course detail sessions  */}
                        <div id="tabTwo">
                            <SubTitle title="سرفصل ها"></SubTitle>
                            <div className="mt-5 space-y-3">
                                <Session
                                    sessionTitle="معرفی دوره"
                                    sessionIndex="فصل اول"
                                >
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                معرفی دوره
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                پیش نیاز مشاهده این دوره
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                چرا باید این دوره را مشاهده
                                                کنیم؟
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                در این پروژه از typescript هم
                                                استفاده می‌شود
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                </Session>
                                <Session
                                    sessionTitle="پیاده سازی ساختار پروژه"
                                    sessionIndex="فصل دوم"
                                >
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                معرفی دوره
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <Link
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </Link>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                پیش نیاز مشاهده این دوره
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                چرا باید این دوره را مشاهده
                                                کنیم؟
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                    <li className="flex flex-col sm:flex-row items-start sm:items-center gap-3 justify-between border border-border py-3 px-2 md:px-3 md:py-1 rounded-xl text-xs">
                                        <div className="flex items-center gap-2 md:gap-5">
                                            <span>1</span>
                                            <Link
                                                href="#"
                                                className="text-title font-YekanBakh-SemiBold transition-colors hover:text-primary line-clamp-1"
                                            >
                                                در این پروژه از typescript هم
                                                استفاده می‌شود
                                            </Link>
                                        </div>
                                        <div className="flex justify-between sm:justify-end w-full sm:w-auto items-center gap-5">
                                            <div className="flex items-center gap-1">
                                                <span>03:54</span>
                                                <LucideClock size={16}/>
                                            </div>
                                            <a
                                                className="flex items-center justify-center gap-1 bg-secondary rounded-full text-xs px-4 h-9 hover:text-primary transition-colors shrink-0"
                                                href="#"
                                            >
                                                <span className="font-YekanBakh-SemiBold">
                                                    مشاهده
                                                </span>
                                                <LucideArrowUpLeft size={20}/>
                                            </a>
                                        </div>
                                    </li>
                                </Session>
                            </div>
                        </div>
                        {/*  course detail comments  */}
                        <div id="tabThree" className="pt-8 pb-5">
                            <SubTitle title="دیدگاه و پرسش"></SubTitle>
                            <div className="p-5 rounded-3xl my-5 border border-border">
                                <SubTitle
                                    className="text-xs"
                                    title="ارسال دیدگاه یا پرسش"
                                ></SubTitle>
                                <div className="flex items-end md:items-center flex-wrap gap-y-5 justify-between my-5">
                                    <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                                        <UserInfo
                                            text="دوهفته پیش"
                                            title="حسین رستمی"
                                        />
                                        <div className="flex items-center gap-3">
                                            <span className="bg-secondary w-1 h-1 rounded-full"></span>
                                            <span className="text-xs">
                                                در پاسخ به
                                            </span>
                                            <span className="bg-secondary w-1 h-1 rounded-full"></span>
                                            <span className="text-sm font-YekanBakh-SemiBold text-title">
                                                حسین رستمی
                                            </span>
                                        </div>
                                    </div>
                                    <button className="text-red-500 font-YekanBakh-SemiBold text-sm">
                                        لغو پاسخ
                                    </button>
                                </div>
                                <form
                                    className="flex flex-col items-end gap-5"
                                    action="#"
                                >
                                    <textarea
                                        rows={10}
                                        placeholder="متن مورد نظر خود را وارد کنید ..."
                                        className="p-5 bg-secondary rounded-xl text-sm text-title overflow-hidden w-full outline-none"
                                    ></textarea>
                                    <PrimaryButton
                                        title="ثبت دیدگاه یا پرسش"
                                        icon={<LucideArrowUpLeft size={20}/>}
                                        href="#"
                                    />
                                </form>
                            </div>
                            <div>
                                <div className="p-5 rounded-2xl border border-border mb-3">
                                    <div className="flex items-center justify-between pb-4 border-b border-border">
                                        <UserInfo
                                            text="2 هفته پیش"
                                            title="حسین رستمی"
                                        ></UserInfo>
                                        <div className="flex items-center gap-3">
                                            <SectionLinkBtn
                                                className="h-9 text-xs text-caption"
                                                icon={<LucideCornerUpRight size={20}/>}
                                                text="پاسخ"
                                            />
                                            <LikeButton
                                                className="h-9 w-9"
                                                count="3"
                                            />
                                        </div>
                                    </div>
                                    <p className="text-sm mt-3">
                                        من این دوره رو خریدم و میخوام نکست هم
                                        بعدا یاد بگیرم چون نیاز بیشتری دارم به
                                        اموزش های این دوره میشه بدون اینکه دوره
                                        نکست رو ببینم این دوره رو ببینم(بخش6دوره
                                        بیشتر مد نظرمه)
                                    </p>
                                </div>
                                <div className='pr-16 space-y-3 relative before:w-px before:bg-border before:content-[""] before:absolute before:h-[calc(100%-24px)] before:right-6 before:-top-3 after:bg-border after:content-[""] after:h-px after:w-10 after:right-6 after:absolute after:bottom-9'>
                                    <div className="p-5 rounded-2xl border border-border">
                                        <div className="flex items-center justify-between pb-4 border-b border-border">
                                            <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            />
                                            <div className="flex items-center gap-3">
                                                <SectionLinkBtn
                                                    className="h-9 text-xs text-caption"
                                                    icon={<LucideCornerUpRight size={20}/>}
                                                    text="پاسخ"
                                                />
                                                <LikeButton
                                                    className="w-9 h-9"
                                                    count="3"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm mt-3">
                                            من این دوره رو خریدم و میخوام نکست
                                            هم بعدا یاد بگیرم چون نیاز بیشتری
                                            دارم به اموزش های این دوره میشه بدون
                                            اینکه دوره نکست رو ببینم این دوره رو
                                            ببینم(بخش6دوره بیشتر مد نظرمه)
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-2xl border border-border">
                                        <div className="flex items-center justify-between pb-4 border-b border-border">
                                            <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            />
                                            <div className="flex items-center gap-3">
                                                <SectionLinkBtn
                                                    className="h-9 text-xs text-caption"
                                                    icon={<LucideCornerUpRight size={20}/>}
                                                    text="پاسخ"
                                                />
                                                <LikeButton
                                                    className="w-9 h-9"
                                                    count="3"
                                                />
                                            </div>
                                        </div>
                                        <p className="text-sm mt-3">
                                            من این دوره رو خریدم و میخوام نکست
                                            هم بعدا یاد بگیرم چون نیاز بیشتری
                                            دارم به اموزش های این دوره میشه بدون
                                            اینکه دوره نکست رو ببینم این دوره رو
                                            ببینم(بخش6دوره بیشتر مد نظرمه)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*  course detail left side  */}
                    <div className="md:w-4/12 space-y-8 md:sticky md:top-24">
                        <div className="bg-gradient-to-b from-secondary to-background rounded-2xl px-5 pb-5">
                            <div className="bg-background rounded-bl-2xl rounded-br-2xl p-5 mb-5">
                                <SubTitle title="نام نویسی در دوره" />
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="font-YekanBakh-Bold">
                                    هزینه ثبت نام :
                                </span>
                                <div className="flex flex-col items-end">
                                    <span className="line-through">
                                        1,900,000
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="text-xl text-title font-YekanBakh-Black">
                                            1,450,000
                                        </span>
                                        <span className="text-xs hidden lg:inline-block">
                                            تومان
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 mt-3">
                                <PrimaryButton
                                    icon={<LucideArrowUpLeft size={20}/>}
                                    title="اضافه به سبد"
                                />
                                <LikeButton />
                            </div>
                        </div>
                        <div className="space-y-3">
                            <SubTitle
                                className="text-sm"
                                title="مدرس دوره"
                            ></SubTitle>
                            <div>
                                <UserInfo
                                    text="دیدن رزومه"
                                    img="/images/profile.jpeg"
                                    title="حسین رستمی"
                                />
                                <div className="p-5 bg-secondary rounded-tl-2xl rounded-tr-2xl md:rounded-tr-none rounded-b-2xl mt-3">
                                    <p className="text-sm">
                                        اول داستان، طراح گرافیک بودم و ۲ سالی به
                                        عنوان طراح مشغول بودم، بعد به
                                        برنامه‌نویسی علاقمند شدم و الان بیشتر از
                                        ۱۰ ساله که عاشق کدزنی و چالش‌های
                                        پروژه‌های مختلفم. به تدریس علاقه خاصی
                                        دارم و دوست دارم دانشی که در این راه
                                        بدست آوردم را در اختیار دیگران قرار بدم
                                        :)
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
