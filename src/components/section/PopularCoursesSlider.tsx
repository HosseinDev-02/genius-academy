'use client';
import React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Course from "../ui/Course";
import { courses as popularCourses } from "@/src/lib/placeholder-data";
function PopularCoursesSlider() {
    return (
        <Swiper
            slidesPerView={1}
            spaceBetween={20}
            grabCursor={true}
            modules={[Pagination, Autoplay]}
            pagination={{
                clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className="mySwiper mt-8 !pb-8"
            breakpoints={{
                640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }}
        >
            {popularCourses.length &&
                popularCourses.map((course) => (
                    <SwiperSlide>
                        <Course key={course.id} {...course}></Course>
                    </SwiperSlide>
                ))}
        </Swiper>
    );
}

export default PopularCoursesSlider;
