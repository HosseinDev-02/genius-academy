import ArticlesProvider from "@/src/components/section/articles/ArticlesProvider";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import React from "react";
import Article from "@/src/components/ui/Article";
import { articles } from "@/src/lib/placeholder-data";
import SectionHeader from "@/src/components/ui/section/SectionHeader";
export default function page() {
    return (
        <main className="py-5">
            <div className="container">
                <div className="space-y-8">
                    <SectionHeader>
                        <SectionTitle
                            lineHeight="1rem"
                            fontSize="12px"
                            title="مقالات آموزشی"
                            text="از گوشه و اطراف دنیای برنامه نویسی"
                        ></SectionTitle>
                    </SectionHeader>
                    <ArticlesProvider>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
                            {articles.map((article) => (
                                <Article
                                    className={"!rounded-none shadow-lg"}
                                    roundedImg={false}
                                    key={article.id}
                                    {...article}
                                ></Article>
                            ))}
                        </div>
                    </ArticlesProvider>
                </div>
            </div>
        </main>
    );
}
