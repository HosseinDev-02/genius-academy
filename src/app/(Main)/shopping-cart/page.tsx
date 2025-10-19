import LatestCourses from "@/src/components/section/courses/LatestCourses";
import CartItem from "@/src/components/ui/CartItem";
import SubTitle from "@/src/components/ui/SubTitle";
import PrimaryButton from "@/src/components/ui/button/PrimaryButton";
import SectionHeader from "@/src/components/ui/section/SectionHeader";
import SectionTitle from "@/src/components/ui/section/SectionTitle";
import { cartProducts, latestCourses } from "@/src/lib/placeholder-data";
import { LucideArrowUpLeft } from "lucide-react";
import React from "react";

export default function ShoppingCart() {
    return (
        <main className="pt-5">
            <div className="container space-y-14">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-5">
                    <div className="md:w-7/12 lg:w-8/12">
                        <SectionHeader>
                            {cartProducts.length ? (
                                <SectionTitle
                                    textColor="#6b7280"
                                    fontSize="12px"
                                    lineHeight="1rem"
                                    title="سبد خرید شما"
                                    text={`${cartProducts.length} دوره به سبد خرید اضافه کرده اید`}
                                ></SectionTitle>
                            ) : (
                                <SectionTitle title="سبد خرید شما خالی است !"></SectionTitle>
                            )}
                        </SectionHeader>
                        {/*  basket content  */}
                        <div className="divide-y divide-border divide-dashed">
                            {cartProducts.length
                                ? cartProducts.map((product) => (
                                      <CartItem key={product.id} {...product} />
                                  ))
                                : ""}
                        </div>
                    </div>
                    {/*  user basket left side  */}
                    <div className="w-full md:w-5/12 lg:w-4/12 md:sticky md:top-24">
                        <div className="bg-gradient-to-b from-secondary to-background rounded-2xl pb-5 px-5">
                            <div className="bg-background flex items-center rounded-b-3xl p-5 mb-5">
                                <SubTitle title="اطلاعات پرداخت"></SubTitle>
                            </div>
                            <div className="space-y-2 mb-5">
                                <div className="flex items-center justify-between">
                                    <span className="font-YekanBakh-Bold text-title text-xs">
                                        جمع کل :
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-YekanBakh-Black text-title">
                                            2,280,000
                                        </span>
                                        <span className="text-xs">تومان</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-YekanBakh-Bold text-title text-xs">
                                        تخفیف :
                                    </span>
                                    <div className="flex items-center gap-1">
                                        <span className="font-YekanBakh-Black text-title">
                                            780,000
                                        </span>
                                        <span className="text-xs">تومان</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between py-5 border-t border-border">
                                <span className="font-YekanBakh-Bold text-title text-sm">
                                    مبلغ قابل پرداخت :
                                </span>
                                <div className="flex items-center gap-1">
                                    <span className="text-title font-YekanBakh-Black text-xl">
                                        1,500,000
                                    </span>
                                    <span className="text-xs">تومان</span>
                                </div>
                            </div>
                        </div>
                        {cartProducts.length ? (
                            <PrimaryButton
                                icon={<LucideArrowUpLeft size={20} />}
                                title="تکمیل فرایند خرید"
                            ></PrimaryButton>
                        ) : (
                            ""
                        )}
                    </div>
                </div>
                <LatestCourses latestCourses={latestCourses}></LatestCourses>
            </div>
        </main>
    );
}
