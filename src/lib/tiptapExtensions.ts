import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Heading, { HeadingOptions } from "@tiptap/extension-heading";
import { mergeAttributes } from "@tiptap/core";
import Paragraph from "@tiptap/extension-paragraph";
import Image from "@tiptap/extension-image";

export const CustomParagraph = Paragraph.extend({
    renderHTML({ HTMLAttributes }: { HTMLAttributes: any }) {
        return ["p", { ...HTMLAttributes, class: "text-sm" }, 0];
    },
});

export const CustomImage = Image.extend({
    renderHTML({ HTMLAttributes }: { HTMLAttributes: any }) {
        return [
            "img",
            {
                ...HTMLAttributes,
                class: "w-full rounded-3xl",
            },
        ];
    },
});

// 🎯 Extension برای دو سطح h2 و h3 با کلاس‌های متفاوت
export const CustomTitle = Heading.extend<HeadingOptions>({
    renderHTML({ node, HTMLAttributes }: { node: any; HTMLAttributes: any }) {
        const level = node.attrs.level ?? 2; // پیش‌فرض h2 اگر level نبود

        // کلاس‌ها برای هر heading
        const classes: Record<number, string> = {
            2: "text-xl text-title font-YekanBakh-Black mb-3",
            3: "text-lg text-title font-YekanBakh-Black mb-3",
        };

        return [
            `h${level}`,
            mergeAttributes(HTMLAttributes, {
                class: classes[level] || classes[2], // اگه level تعریف نشده بود
            }),
            0,
        ];
    },
});

export const extensions = [
    StarterKit.configure({
        heading: false,
        paragraph: false,
    }),
    CustomTitle,
    CustomParagraph,
    CustomImage,
    TextAlign.configure({
        types: ["heading", "paragraph"],
    }),
];
