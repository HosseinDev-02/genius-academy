import { LucideArrowUpLeft } from "lucide-react";
import PrimaryButton from "../components/ui/Buttons/PrimaryButton";
import { latestCourses, services } from "../lib/placeholder-data";
import ServiceItem from "../components/ui/ServiceItem";
import SectionHeader from "../components/ui/section/SectionHeader";
import SectionTitle from "../components/ui/section/SectionTitle";
import SectionLinkBtn from "../components/ui/section/SectionLinkBtn";
import Course from "../components/ui/Course";
import CommentsSlider from "../components/section/CommentsSlider";


export default function Home() {
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
                            <img
                                className="w-full h-full object-cover"
                                src="images/Introduction/main.png"
                                alt=""
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
                                        key={service.id}
                                        {...service}
                                    ></ServiceItem>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
            {/* Latest Courses Section */}
            <section>
                <div className="container">
                    {/*  Section Header  */}
                    <SectionHeader>
                        <SectionTitle
                            title="آخرین دوره های"
                            text="منتشر شده"
                        ></SectionTitle>
                        <SectionLinkBtn
                            href="/courses"
                            icon={<LucideArrowUpLeft size={20} />}
                            text="مشاهده همه"
                        ></SectionLinkBtn>
                    </SectionHeader>
                    {/*  Section Content  */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-8 gap-5">
                        {latestCourses.length &&
                            latestCourses.map((course) => {
                                return (
                                    <Course
                                        key={course.id}
                                        {...course}
                                    ></Course>
                                );
                            })}
                    </div>
                </div>
            </section>
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
                            <CommentsSlider/>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
