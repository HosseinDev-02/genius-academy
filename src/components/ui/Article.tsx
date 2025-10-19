import Link from "next/link";
import LikeButton from "./button/LikeButton";
import { Article } from "@/src/lib/definition";
import Image from "next/image";

type TArticleProps = Article & { roundedImg?: boolean; className?: string };

export default function Article({
    title,
    className,
    img,
    writer,
    writerImg,
    category,
    time,
    roundedImg,
    id,
    href,
    writerHref,
}: TArticleProps) {
    // const [isImgLoaded, setIsImgLoaded] = useState(false);

    // const imgLoadedHandler = () => setIsImgLoaded(true);

    return (
        <div className={`bg-background rounded-xl p-4 ${className}`}>
            <div className="relative">
                <Link
                    href={href ?? "#"}
                    className="flex items-center justify-center"
                >
                    {roundedImg ? (
                        <Image
                            width={324}
                            height={162}
                            className="object-cover rounded-xl"
                            src={img}
                            alt={title}
                        />
                    ) : (
                        <Image
                            width={324}
                            height={162}
                            className="object-cover rounded-xl"
                            src={img}
                            alt={title}
                        />
                    )}
                </Link>
                {/* {!isImgLoaded && (
                    <Loader
                        emptyColor="rgb(var(--color-secondary))"
                        filledColor="rgb(var(--color-primary))"
                        className="my-loader"
                    />
                )} */}
                <LikeButton
                    shadow={true}
                    className="w-9 h-9 !absolute -bottom-3 left-3"
                ></LikeButton>
            </div>
            <div className="space-y-3 mt-3">
                <h6 className="mt-2 text-title text-sm font-YekanBakh-Bold">
                    <Link
                        className="hover:text-primary transition-colors"
                        href={href ?? "#"}
                    >
                        {title}
                    </Link>
                </h6>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="flex items-center justify-center rounded-full w-[30px] h-[30px] overflow-hidden border border-white relative">
                            <Image
                                fill
                                objectFit="cover"
                                src={writerImg}
                                alt={writer}
                            />
                        </span>
                        <Link
                            className="hover:text-primary transition-colors text-xs font-YekanBakh-Bold text-title"
                            href={writerHref}
                        >
                            {writer}
                        </Link>
                    </div>
                    <Link
                        href={href ?? "#"}
                        className="flex items-center justify-center px-4 h-8 rounded-full bg-primary/10 hover:opacity-80 transition-opacity"
                    >
                        <span className="text-xxs text-primary font-YekanBakh-Bold">
                            {category}
                        </span>
                    </Link>
                </div>
                <div className="flex items-center gap-1 text-xs justify-end font-YekanBakh-SemiBold">
                    <span>
                        <svg className="w-5 h-5">
                            <use href="#clock-outline"></use>
                        </svg>
                    </span>
                    <span>زمان مطالعه :</span>
                    <span className="text-title">{time} دقیقه </span>
                </div>
            </div>
        </div>
    );
}
