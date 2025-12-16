import PageHeader from "@/src/components/admin-panel/PageHeader";
import OfferForm from "@/src/components/admin-panel/offers/OfferForm";
import { getShortCourses } from "@/src/lib/storage/courses";
import React from "react";

export default async function AddOfferPage() {
    const courses = await getShortCourses();
    const filteredCourses = courses.filter((course) => course.price > 0);
    return (
        <>
            <PageHeader />
            <OfferForm courses={filteredCourses} />
        </>
    );
}
