import LikeButton from "./button/LikeButton";
import PrimaryButton from "./button/PrimaryButton";
import UserInfo from "./user/UserInfo";
import Link from "next/link";
import GridBoxesIcon from "../icon/GridBoxesIcon";
import PapersIcon from "../icon/PapersIcon";
import ClockIcon from "../icon/ClockIcon";
import { LucideArrowUpLeft } from "lucide-react";
import Image from "next/image";
import { Course, CourseWithRelations } from "@/src/lib/type-definition";

export default function Course(props: CourseWithRelations) {
    const { category, price, is_completed, short_name, title, image, user } = props
    // const [isImgLoaded, setIsImgLoaded] = useState(false);

    // const imgLoadedHandler = () => setIsImgLoaded(true);

    return (
        <div>
            <div className="flex items-center justify-center rounded-3xl overflow-hidden relative">
                <Link className="flex w-full" href={`/course-detail/${short_name}`}>
                    <Image
                        width={400}
                        height={225}
                        className="w-full"
                        src={image}
                        alt={title}
                    />
                </Link>
                <Link
                    href={`/course-detail/${short_name}`}
                    className="absolute left-3 top-3 flex items-center gap-1 bg-black/20 rounded-full h-11 px-4 text-white hover:opacity-80 transition-all"
                >
                    <GridBoxesIcon width={24} height={24} />
                    <span className="font-YekanBakh-SemiBold text-sm tracking-wider">
                        {category.title}
                    </span>
                </Link>
            </div>
            <div className="bg-gradient-to-b from-background to-secondary mx-5 p-5 rounded-3xl">
                <div className="flex items-center gap-2">
                    {is_completed ? (
                        <>
                            <span className="block bg-success w-1 h-1 rounded-full"></span>
                            <span className="text-xs font-YekanBakh-Black text-success">
                                تکمیل شده
                            </span>
                        </>
                    ) : (
                        <>
                            <span className="block bg-yellow-500 dark:bg-yellow-600 w-1 h-1 rounded-full"></span>
                            <span className="text-xs font-YekanBakh-Black text-yellow-500 dark:text-yellow-600">
                                در حال برگزاری
                            </span>
                        </>
                    )}
                </div>
                <h6 className="mt-2 text-title text-sm font-YekanBakh-Bold">
                    <Link
                        className="hover:text-primary transition-colors line-clamp-1"
                        href={`/course-detail/${short_name}`}
                    >
                        {title}
                    </Link>
                </h6>
            </div>
            <div className="p-5">
                <div className="flex items-center gap-5">
                    <div className="flex items-center gap-1">
                        <PapersIcon width={20} height={20} />
                        <span className="text-xs font-YekanBakh-SemiBold">
                            24 فصل
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <ClockIcon width={20} height={20} />
                        <span className="text-xs font-YekanBakh-SemiBold">
                            15 ساعت
                        </span>
                    </div>
                </div>
                <div className="flex items-center justify-between gap-5 mt-3">
                    <UserInfo
                        title="مدرس دوره :"
                        text={user.name}
                        img={user.image}
                    ></UserInfo>
                    {price === 0 ? (
                        <div className="flex items-center justify-center h-14">
                            <span className="text-success font-YekanBakh-Black text-xl line-clamp-1">
                                رایگان !
                            </span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1 h-14">
                            <span className="text-title font-YekanBakh-Black text-lg xl:text-xl">
                                {Number(price).toLocaleString()}
                            </span>
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 mt-3">
                    <PrimaryButton
                        icon={<LucideArrowUpLeft size={20} />}
                        title="مشاهده دوره"
                    ></PrimaryButton>
                    <LikeButton></LikeButton>
                </div>
            </div>
        </div>
    );
}

// : price ? (
//     <div className="flex items-end h-14 flex-col justify-center">
//         <span className='relative block before:bg-caption before:absolute before:-top-1 before:bottom-0 before:w-full before:my-auto before:h-px before:content[" "] font-YekanBakh-SemiBold'>
//             {price.toLocaleString()}
//         </span>
//         {price && (
//             <div className="flex items-center gap-1">
//                 <span className="text-title font-YekanBakh-Black text-lg xl:text-xl">
//                     {price.toLocaleString()}
//                 </span>
//             </div>
//         )}
//     </div>
// )
