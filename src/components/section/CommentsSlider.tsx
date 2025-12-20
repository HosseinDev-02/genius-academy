"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Navigation } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";
import { LucideChevronLeft, LucideChevronRight } from "lucide-react";
import Image from "next/image";
import { CommentWithRelations } from "@/src/lib/type-definition";
function CommentsSlider({ comments }: { comments: CommentWithRelations[] }) {
    console.log("comments", comments);
    return (
        <Swiper
            effect={"cards"}
            grabCursor={true}
            modules={[EffectCards, Navigation]}
            className="mySwiper"
            navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            }}
        >
            {comments
                .slice()
                .splice(0, 2)
                .map((comment, index) => {
                    console.log('index :', index);
                    return (
                        <SwiperSlide>
                        <div className="inline-flex flex-col items-center gap-8 border border-border relative rounded-2xl p-8 bg-background w-full">
                            <p className="text-center text-sm font-YekanBakh-SemiBold line-clamp-3">
                                {comment.content}
                            </p>
                            <div className="flex items-center gap-2">
                                <span className="block overflow-hidden w-10 h-10 rounded-full relative">
                                    <Image
                                        fill
                                        sizes="100%"
                                        src={comment.user.image}
                                        alt="User Image"
                                    />
                                </span>
                                <div className="flex flex-col gap-1 text-xs">
                                    <span className="text-title font-YekanBakh-Bold">
                                        {comment.user.name}
                                    </span>
                                    <span className="font-YekanBakh-SemiBold">
                                        {comment.course.title ??
                                            comment.article.title}
                                    </span>
                                </div>
                            </div>
                            <div className="swiper-button-next rounded-full w-10 h-10 border border-border flex items-center justify-center absolute left-2 top-1/2">
                                {
                                    index == 0 ? (
                                        <LucideChevronLeft size={20} />
                                    ) : (
                                        <LucideChevronRight size={20} />
                                    )
                                }
                            </div>
                        </div>
                    </SwiperSlide>
                    )
                })}
        </Swiper>
    );
}

export default CommentsSlider;
