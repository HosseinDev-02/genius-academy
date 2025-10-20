import SubTitle from "@/src/components/ui/SubTitle";
import UserInfo from "@/src/components/ui/user/UserInfo";
import LikeButton from "@/src/components/ui/button/LikeButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SectionLinkBtn from "@/src/components/ui/section/SectionLinkBtn";
import { LucideArrowUpLeft, LucideCornerUpRight } from "lucide-react";
import React from "react";

export default function ArticleDetail() {
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
                                src="/images/Articles/backend-vs-frontend.jpg"
                                alt=""
                            />
                        </div>
                        {/*  course infos  */}
                        <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl space-y-2">
                            <h1 className="text-title text-xl font-YekanBakh-Bold">
                                تفاوت بک اند و فرانت اند
                            </h1>
                            <p className="text-sm">
                                ساخت وبسایت فروشگاهی با React عنوان دوره پروژه
                                محور react در نابغه است که قصد داریم در قالب این
                                دوره react را در قالب پروژه به شما آموزش دهیم.
                            </p>
                        </div>
                        {/*  course detail description  */}
                        <div className="space-y-5 p-5 mt-5">
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
                                    تفاوت بک اند و فرانت اند
                                </h2>
                                <div>
                                    <img
                                        className="w-full rounded-3xl"
                                        src="/images/Articles/backend-vs-frontend.jpg"
                                        alt=""
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
                            {/*  course structure  */}
                            <div>
                                <h3 className="text-lg text-title font-YekanBakh-Black mb-3">
                                    بک اند
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
                            <div>
                                <h3 className="text-lg text-title font-YekanBakh-Black mb-3">
                                    فرانت اند
                                </h3>
                                <p className="text-sm">
                                    در ساختار این دوره مانند دوره‌های آموزشی
                                    دیگر، ما از یک سرفصل‌بندی جامع و دقیق
                                    استفاده خواهیم کرد. در ادامه ما سعی می‌کنیم
                                    این ساختار را به صورت تمام و کمال به شما
                                    معرفی کنیم.
                                </p>
                            </div>
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
                        </div>
                        {/*  course detail comments  */}
                        <div id="tabThree" className="pt-8 pb-5">
                            <SubTitle title="دیدگاه و پرسش" />
                            <div className="p-5 rounded-3xl my-5 border border-border">
                                <SubTitle
                                    className="text-xs"
                                    title="ارسال دیدگاه یا پرسش"
                                />
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
                                        icon={<LucideArrowUpLeft size={20} />}
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
                                        />
                                        <div className="flex items-center gap-3">
                                            <SectionLinkBtn
                                                className="text-xs text-caption h-9"
                                                icon={
                                                    <LucideCornerUpRight
                                                        size={20}
                                                    />
                                                }
                                                text="پاسخ"
                                            />
                                            <LikeButton
                                                className="w-9 h-9"
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
                                                    className="text-xs text-caption h-9"
                                                    icon={
                                                        <LucideCornerUpRight
                                                            size={20}
                                                        />
                                                    }
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
                                                    className="text-xs text-caption h-9"
                                                    icon={
                                                        <LucideCornerUpRight
                                                            size={20}
                                                        />
                                                    }
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
                    <div className="md:w-4/12 md:sticky md:top-24">
                        <div className="space-y-3">
                            <SubTitle className="text-sm" title="نویسنده :" />
                            <div>
                                <UserInfo
                                    text="دیدن رزومه"
                                    title="حسین رستمی"
                                />
                                <div className="p-5 bg-secondary rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mt-3">
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
