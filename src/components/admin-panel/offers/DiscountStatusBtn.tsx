"use client";
import { Button } from "@/components/ui/button";
import { Offer, OfferWithRelations } from "@/src/lib/type-definition";
import { useRouter } from "next/navigation";
import React from "react";
import { Toaster, toast } from "sonner";

export default function DiscountStatusBtn({
    offer,
}: {
    offer: OfferWithRelations;
}) {
    const router = useRouter();
    const deActiveHandler = async () => {
        console.log("id :", offer.id);
        try {
            const response = await fetch(`/api/offers/${offer.id}`, {
                method: "PUT",
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                router.refresh();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };

    return (
        <>
            <Button
                onClick={deActiveHandler}
                className={`${offer.is_active ? "bg-red-700" : "bg-teal-700"} cursor-pointer`}
            >
                {offer.is_active ? "غیرفعال کردن" : "فعال کردن"}
            </Button>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </>
    );
}
