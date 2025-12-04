import Image from "next/image";
import React from "react";

export default function AdminPanelUserSidebar() {
    return (
        <div className="col-span-2 bg-zinc-900 rounded-4xl text-sm font-YekanBakh-SemiBold">
            <div className="flex items-center lg:justify-center justify-between border-b border-teal-800 py-4 px-2">
                <h5 className="block font-YekanBakh-Black text-2xl text-center text-teal-700">
                    اطلاعات کاربر
                </h5>
            </div>
            <div className="p-4">
                <div className="flex items-center gap-2">
                    <div className="w-12 h-12 rounded-full p-1 border-2 border-teal-600">
                        <div className="relative rounded-full h-full w-full overflow-hidden">
                            <Image
                                className="w-full h-full object-cover"
                                src={"/images/profile.jpeg"}
                                alt={"user_image"}
                                fill
                                priority
                            />
                        </div>
                    </div>
                    <span>حسین رستمی</span>
                </div>
                <div className="space-y-5 mt-8">
                    <div className="flex items-center justify-between">
                        <span className="font-YekanBakh-Bold">شماره تماس :</span>
                        <span className="font-YekanBakh-Regular">09930094221</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-YekanBakh-Bold">ایمیل :</span>
                        <span className="font-YekanBakh-Regular">a6PbI@example.com</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-YekanBakh-Bold">سطح دسترسی :</span>
                        <span className="text-teal-600 font-YekanBakh-Regular">ادمین</span>
                    </div>
                    <div className="">
                         <p className="tracking-widest">
                            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی
                        </p>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}
