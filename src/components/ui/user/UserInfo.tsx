import Image from "next/image";
import Link from "next/link";

type TUserInfoProps = {
    img?: string;
    title?: string;
    text: string;
    href?: string;
}

export default function UserInfo(props: TUserInfoProps) {
    return (
        <div className='flex items-center gap-2'>
            <span className='block overflow-hidden w-10 h-10 rounded-full shrink-0 relative'>
                <Image fill objectFit="cover" src={props.img ? props.img : '/images/profile.jpeg'} alt={props.title ?? 'User Image'} />
            </span>
            <div className='flex flex-col gap-1 text-xs font-YekanBakh-SemiBold'>
                {
                    props.title && (
                        <span className='line-clamp-1 text-xs'>
                    {props.title}
                </span>
                    )
                }
                <Link href={props.href ?? '#'} className='text-title hover:text-primary transition-colors font-YekanBakh-Bold line-clamp-1 text-xs'>
                    {props.text}
                </Link>
            </div>
        </div>
    )
}