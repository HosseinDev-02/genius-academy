import Link from "next/link";
import LikeButton from "./button/LikeButton";
import { Article } from "@/src/lib/definition";
import Image from "next/image";
import { ArticleWithRelations } from "@/src/lib/type-definition";

type Props = {
    className?: string;
    roundedImg?: boolean;
    article: ArticleWithRelations;
};

export default function Article(props: Props) {
    const { article, className, roundedImg } = props;
    const { image, title, about, short_name, author, category, time_read } =
        article;
    // const [isImgLoaded, setIsImgLoaded] = useState(false);

    // const imgLoadedHandler = () => setIsImgLoaded(true);

    return (
        <div className={`bg-background rounded-xl p-4 ${className}`}>
            <div className="relative">
                <Link
                    href={`/article-detail/${short_name}`}
                    className="flex items-center justify-center"
                >
                    {roundedImg ? (
                        <Image
                            width={324}
                            height={162}
                            className="object-cover rounded-xl w-full"
                            src={image}
                            alt={title}
                        />
                    ) : (
                        <Image
                            width={324}
                            height={162}
                            className="object-cover rounded-xl w-full"
                            src={image}
                            alt={title}
                        />
                    )}
                </Link>
                {/* <LikeButton
                    shadow={true}
                    className="w-9 h-9 !absolute -bottom-3 left-3"
                ></LikeButton> */}
            </div>
            <div className="space-y-3 mt-3">
                <h6 className="mt-2 text-title text-sm font-YekanBakh-Bold">
                    <Link
                        className="hover:text-primary transition-colors"
                        href={`/article-detail/${short_name}`}
                    >
                        {title}
                    </Link>
                </h6>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="flex items-center justify-center rounded-full w-[30px] h-[30px] overflow-hidden border border-white relative">
                            <Image
                                fill
                                sizes="100%"
                                src={author?.image}
                                alt={author?.name}
                            />
                        </span>
                        <span className="text-xs font-YekanBakh-Bold text-title">
                            {author?.name}
                        </span>
                    </div>
                    <div className="flex items-center justify-center px-4 h-8 rounded-full bg-primary/10">
                        <span className="text-xxs text-primary font-YekanBakh-Bold">
                            {category?.title}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-1 text-xs justify-end font-YekanBakh-SemiBold">
                    <span>
                        <svg className="w-5 h-5">
                            <use href="#clock-outline"></use>
                        </svg>
                    </span>
                    <span>زمان مطالعه :</span>
                    <span className="text-title">{time_read} دقیقه </span>
                </div>
            </div>
        </div>
    );
}
