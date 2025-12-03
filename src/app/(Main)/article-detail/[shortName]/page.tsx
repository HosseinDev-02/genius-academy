import SubTitle from "@/src/components/ui/SubTitle";
import UserInfo from "@/src/components/ui/user/UserInfo";
import React from "react";
import Image from "next/image";
import { ArticleWithRelations } from "@/src/lib/type-definition";
import { getArticleByShortName } from "@/src/lib/storage/articles";
import { generateHTML } from "@tiptap/html";
import { extensions } from "@/src/lib/tiptapExtensions";
import CommentWrapper from "@/src/components/section/courses/CommentsWrapper";
import { getMe } from "@/src/lib/storage/me";

export default async function ArticleDetail({
    params,
}: {
    params: Promise<{ shortName: string }>;
}) {
    const { shortName } = await params;
    const article = (await getArticleByShortName(
        shortName
    )) as ArticleWithRelations;

    const {
        title,
        author,
        about,
        image,
        content,
    } = article;

    const htmlContent = generateHTML(content, extensions);
    const user = await getMe();

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
                        {/*  article content  */}
                        <div className="p-5 mt-5">
                            <div
                                className="space-y-5"
                                dangerouslySetInnerHTML={{
                                    __html: htmlContent,
                                }}
                            ></div>
                        </div>
                        {/*  article comments  */}
                        <div id="comments" className="pt-8 pb-5">
                            <CommentWrapper
                                user={user}
                                article={article}
                            />
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
