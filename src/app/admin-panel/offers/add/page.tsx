import OfferForm from "@/src/components/admin-panel/offers/OfferForm";
import { getShortCourses } from "@/src/lib/storage/courses";
import React from "react";

export default async function AddOfferPage() {
    const courses = await getShortCourses();
    return <OfferForm courses={courses} />;
}
