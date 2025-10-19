import EducationIcon from "../../icon/EducationIcon";

type TSectionTitleProps = {
    className?: string;
    title: string;
    text?: string;
    textColor?: string;
    fontSize?: string;
    lineHeight?: string;
};

export default function SectionTitle(props: TSectionTitleProps) {
    return (
        <div
            className={`flex items-center gap-2.5 sm:gap-5 shrink-0 ${props.className}`}
        >
            <span className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shrink-0">
                <EducationIcon width={20} height={20}/>
            </span>
            <div className="lg:max-w-80">
                <h2 className="font-YekanBakh-Black text-lg sm:text-2xl text-primary">
                    {props.title}
                </h2>
                {props.text && (
                    <span
                        style={{
                            color: props.textColor,
                            fontSize: props.fontSize,
                            lineHeight: props.lineHeight,
                        }}
                        className="text-sm sm:text-base inline-block mt-2 font-YekanBakh-SemiBold text-title"
                    >
                        {props.text}
                    </span>
                )}
            </div>
        </div>
    );
}
