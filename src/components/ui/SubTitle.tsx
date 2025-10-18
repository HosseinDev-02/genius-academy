type TSubTitleProps = {
    className?: string,
    title: string
}
export default function SubTitle(props: TSubTitleProps) {
    return (
        <h4 className={`font-YekanBakh-Black text-title relative before:rounded-full before:absolute before:content-[""] before:bg-black dark:before:bg-white before:w-1 before:h-1 pr-7 before:right-0 before:top-0 before:bottom-0 before:my-auto after:rounded-full after:absolute after:content-[""] after:bg-black dark:after:bg-white after:w-2 after:h-2 after:right-2 after:top-0 after:bottom-0 after:my-auto ${props.className}`}>
            {props.title}
        </h4>
    )
}