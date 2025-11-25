import { LucideArrowUpLeft } from "lucide-react";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import ServiceItem from "@/src/components/ui/ServiceItem";
import SectionHeader from "@/src/components/ui/section/SectionHeader";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import SectionLinkBtn from "@/src/components/ui/section/SectionLinkBtn";
import CommentsSlider from "@/src/components/section/CommentsSlider";
import Article from "@/src/components/ui/Article";
import PopularCoursesSlider from "@/src/components/section/courses/PopularCoursesSlider";
import Image from "next/image";
import LatestCourses from "@/src/components/section/courses/LatestCourses";
import { getAllServices } from "@/src/lib/storage/services";
import { getPopularCourses } from "@/src/lib/storage/courses";
import { getLatestArticles } from "@/src/lib/storage/articles";

export default async function Home() {
    const services = await getAllServices();
    const popularCourses = await getPopularCourses();
    const latestArticles = await getLatestArticles();
    console.log("popular courses:", popularCourses);

    return (
        <div className="space-y-14 py-5">
            {/* Introduction Section */}
            <section>
                <div className="container">
                    <div className="bg-gradient-to-l from-secondary to-background rounded-2xl flex flex-col-reverse xl:flex-row items-center justify-center py-16 gap-10 px-5 lg:px-3 xl:px-10">
                        {/*  introduction right side  */}
                        <div className="max-w-[645px] space-y-5">
                            {/*  Introduction right side offer  */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 bg-primary py-1 px-2 rounded-xl text-white animate-pulse transition-all">
                                    <span>
                                        <svg className="w-4 h-4">
                                            <use href="#receipt-percent"></use>
                                        </svg>
                                    </span>
                                    <span className="text-xs font-YekanBakh-SemiBold">
                                        جشنــــواره تخفیف !
                                    </span>
                                </div>
                                <span className="text-xs text-primary font-YekanBakh-SemiBold">
                                    به زودی :)
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl text-title font-YekanBakh-Black">
                                داستان برنامه نویس شدنت
                                <br />
                                از اینجا شروع میشه !
                            </h1>
                            <p className="max-w-80 xl:max-w-none">
                                یادگیری برنامه‌نویسی آرزو نیست، فقط نیاز هست که
                                تلاش و تمرین داشته باشید، بقیه‌اش با نابغه
                            </p>
                            <PrimaryButton
                                className={`!inline-flex`}
                                href="/courses"
                                icon={<LucideArrowUpLeft size={20} />}
                                title="شروع یادگیری برنامه نویسی"
                            ></PrimaryButton>
                        </div>
                        <div className="max-w-72">
                            <Image
                                height={450}
                                width={288}
                                src="/images/Introduction/main.png"
                                alt="Introduction Image"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </section>
            {/* Services Section */}
            <section>
                <div className="container">
                    <div className="bg-secondary rounded-2xl flex items-center flex-col">
                        <div className="inline-flex items-center justify-center rounded-2xl border border-border h-12 px-8 bg-background font-semibold -translate-y-1/2">
                            <h3 className="text-title text-lg font-YekanBakh-Black">
                                چرا آکــــادمــــــی نابغه؟
                            </h3>
                        </div>
                        <div className="flex items-center justify-center flex-wrap gap-5 lg:gap-10 pb-5 md:pb-10 px-2.5 sm:px-5">
                            {services.map((service) => {
                                return (
                                    <ServiceItem
                                        key={service.key}
                                        title={service.title}
                                    ></ServiceItem>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Courses Section */}
            <LatestCourses />
            {/* Comments Section */}
            <section className="py-10">
                <div className="container">
                    <div className="lg:grid lg:grid-cols-12 items-center space-y-5 lg:space-y-0 lg:gap-10">
                        <div className="lg:col-span-4">
                            <SectionTitle
                                textColor="#6b7280"
                                title="در مورد نابغه چه میشنویم؟"
                                text="این‌ها، بخش خیلی کوچکی از نظراتی هستند که افراد مختلف در مورد نابغه دارند."
                            ></SectionTitle>
                        </div>
                        <div className="lg:col-span-8 max-w-xl mx-auto relative">
                            <CommentsSlider />
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Articles Section */}
            <section>
                <div className="container">
                    <div className="bg-gradient-to-l from-secondary to-background rounded-2xl flex flex-col lg:flex-row items-center justify-between p-5 lg:p-3 xl:p-10 gap-10">
                        <SectionTitle
                            text="نوشتن کار جالبیه که از هزاران سال همراه ما بوده و کمک کرده تا همیشه به روز باشیم، ما در نابغه فضای رو به شکلی آماده کردیم تا شما  بتونید ایده‌ها و مطالب جالب حوزه برنامه‌نویسی رو در اختیار هزاران برنامه‌نویس عضو نابغه قرار بدید."
                            title="از گوشه و اطراف دنیای برنامه نویسی"
                            className={"!items-start"}
                            textColor="#6b7280"
                        ></SectionTitle>
                        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 gap-5 sm:pb-8">
                            {latestArticles.length &&
                                latestArticles.map((article) => {
                                    return (
                                        <Article
                                            roundedImg={true}
                                            key={article.id}
                                            article={article}
                                        ></Article>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </section>
            {/* Popular Courses Section */}
            <section>
                <div className="container">
                    {/*  Section Header  */}
                    <SectionHeader>
                        <SectionTitle
                            title="محبوبترین دوره ها"
                            text="به انتخاب شما"
                        ></SectionTitle>
                        <SectionLinkBtn
                            href="/courses"
                            icon={<LucideArrowUpLeft size={20} />}
                            text="مشاهده همه"
                        ></SectionLinkBtn>
                    </SectionHeader>
                    {/*  Section Content  */}

                    <div className="relative">
                        {popularCourses.length ? (
                            <PopularCoursesSlider data={popularCourses} />
                        ) : (
                            <h4 className="text-title text-lg font-YekanBakh-Black text-center py-8">
                                دوره ای برای نمایش وجود ندارد
                            </h4>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
}
