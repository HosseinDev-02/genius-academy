import SubTitle from "@/src/components/ui/SubTitle";
import UserInfo from "@/src/components/ui/user/UserInfo";
import LikeButton from "@/src/components/ui/button/LikeButton";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SectionLinkBtn from "@/src/components/ui/section/SectionLinkBtn";
import { LucideArrowUpLeft, LucideCornerUpRight } from "lucide-react";
import React from "react";
import Image from "next/image";
import { ArticleWithRelations } from "@/src/lib/type-definition";
import { getArticleByShortName } from "@/src/lib/storage/articles";
import { generateHTML } from "@tiptap/html";
import { extensions } from "@/src/lib/tiptapExtensions";

export default async function ArticleDetail({
    params,
}: {
    params: { shortName: string };
}) {
    const { shortName } = params;
    const article = (await getArticleByShortName(
        shortName
    )) as ArticleWithRelations;
    console.log("article :", article);

    const {
        title,
        author,
        about,
        image,
        short_name,
        category,
        time_read,
        content,
    } = article;

    const htmlContent = generateHTML(content, extensions);

    return (
        <section className="py-5">
            <div className="container">
                <div className="flex md:flex-row flex-col md:items-start gap-5">
                    {/*  article detail right side  */}
                    <div className="md:w-8/12 pb-5">
                        {/*  article image  */}
                        <div>
                            <Image
                                width={814}
                                height={407}
                                className="w-full h-full rounded-3xl"
                                src={image}
                                alt={title}
                            />
                        </div>
                        {/*  article infos  */}
                        <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl space-y-2">
                            <h1 className="text-title text-xl font-YekanBakh-Bold">
                                {title}
                            </h1>
                            <p className="text-sm">{about}</p>
                        </div>
                        {/*  article detail description  */}
                        <div className="p-5 mt-5">
                            <div
                                className="space-y-5"
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            ></div>
                        </div>
                        {/*  article detail comments  */}
                        <div id="tabThree" className="pt-8 pb-5">
                            <SubTitle title="دیدگاه و پرسش" />
                            <div className="p-5 rounded-3xl my-5 border border-border">
                                <SubTitle
                                    className="text-xs"
                                    title="ارسال دیدگاه یا پرسش"
                                />
                                <div className="flex items-end md:items-center flex-wrap gap-y-5 justify-between my-5">
                                    <div className="flex md:flex-row flex-col items-start md:items-center gap-3">
                                        {/* <UserInfo
                                            text="دوهفته پیش"
                                            title="حسین رستمی"
                                        /> */}
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
                                        {/* <UserInfo
                                            text="2 هفته پیش"
                                            title="حسین رستمی"
                                        /> */}
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
                                            {/* <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            /> */}
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
                                            {/* <UserInfo
                                                text="2 هفته پیش"
                                                title="حسین رستمی"
                                            /> */}
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
                    {/*  article detail left side  */}
                    <div className="md:w-4/12 md:sticky md:top-24">
                        <div className="space-y-3">
                            <SubTitle className="text-sm" title="نویسنده :" />
                            <div>
                                <UserInfo
                                    image={author?.image}
                                    name={author?.name}
                                />
                                <div className="p-5 bg-secondary rounded-tl-2xl rounded-bl-2xl rounded-br-2xl mt-3">
                                    <p className="text-sm">{author?.about}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
