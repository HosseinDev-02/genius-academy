import Image from "next/image";
import Link from "next/link";

type Props = {
    image: string;
    name: string;
    title?: string;
};

export default function UserInfo({ name, image, title }: Props) {
    return (
        <div className="flex items-center gap-2">
            <span className="block overflow-hidden w-10 h-10 rounded-full shrink-0 relative">
                <Image fill objectFit="cover" src={image} alt={name} />
            </span>
            <div className="flex flex-col gap-1 text-xs font-YekanBakh-SemiBold">
                {
                    title && (
                        <span className="line-clamp-1 text-xs">{title}</span>
                    )
                }
                <span className='text-title font-YekanBakh-Bold line-clamp-1 text-xs'>
                    {name}
                </span>
            </div>
        </div>
    );
}
