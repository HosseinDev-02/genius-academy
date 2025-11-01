"use client";

import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import {
    Bold,
    Italic,
    Underline as UnderlineIcon,
    Link as LinkIcon,
    Image as ImageIcon,
    List,
    Heading1,
    Heading2,
    Undo,
    Redo,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
    value?: string;
    onChange: (value: string) => void;
}

const CustomParagraph = Paragraph.extend({
    renderHTML({ HTMLAttributes}: { HTMLAttributes: any }) {
      return ["p", { ...HTMLAttributes, class: "paragraph" }, 0]
    },
  });

//   const CustomTitle = Paragraph.extend({
//     renderHTML({ HTMLAttributes}: { HTMLAttributes: any }) {
//       return ["p", { ...HTMLAttributes, class: "paragraph" }, 0]
//     },
//   });
export default function TiptapEditor({ value, onChange }: Props) {
    const editor = useEditor({
        extensions: [
            StarterKit.configure({
                heading: { levels: [1, 2, 3] },
                paragraph: false
            }),
            CustomParagraph,
            Underline,
            Link.configure({
                openOnClick: false,
            }),
            Image,
            Image.configure({
                inline: false,
            }),
            TextAlign.configure({
                types: ["heading", "paragraph"],
            }),
        ],
        content: value || "",
        editorProps: {
            attributes: {
                class: cn(
                    "prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[250px] p-4 rounded-md border",
                    "bg-zinc-900 border-zinc-700 text-zinc-100 dark:prose-invert",
                    "text-right leading-relaxed"
                ),
                dir: "rtl",
            },
        },
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        immediatelyRender: false,
    });

    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value || "", { emitUpdate: false });
        }
        console.log(value)
    }, [value]);

    if (!editor) return null;

    const activeClass = "bg-primary text-white";
    const btnClass = "h-8 w-8 p-0 rounded-md";

    return (
        <div className="w-full">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 border border-zinc-700 rounded-md p-2 mb-2 bg-zinc-800/60 backdrop-blur">
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={cn(
                        btnClass,
                        editor.isActive("bold") && activeClass
                    )}
                >
                    <Bold size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={cn(
                        btnClass,
                        editor.isActive("italic") && activeClass
                    )}
                >
                    <Italic size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                        editor.chain().focus().toggleUnderline().run()
                    }
                    className={cn(
                        btnClass,
                        editor.isActive("underline") && activeClass
                    )}
                >
                    <UnderlineIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 1 }).run()
                    }
                    className={cn(
                        btnClass,
                        editor.isActive("heading", { level: 1 }) && activeClass
                    )}
                >
                    <Heading1 size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                        editor.chain().focus().toggleHeading({ level: 2 }).run()
                    }
                    className={cn(
                        btnClass,
                        editor.isActive("heading", { level: 2 }) && activeClass
                    )}
                >
                    <Heading2 size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                        editor.chain().focus().toggleBulletList().run()
                    }
                    className={cn(
                        btnClass,
                        editor.isActive("bulletList") && activeClass
                    )}
                >
                    <List size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        const url = prompt("آدرس لینک:");
                        if (url)
                            editor.chain().focus().setLink({ href: url }).run();
                    }}
                    className={btnClass}
                >
                    <LinkIcon size={16} />
                </Button>

                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    onClick={() => {
                        // یه input مخفی می‌سازیم
                        const input = document.createElement("input");
                        input.type = "file";
                        input.accept = "image/*";

                        input.onchange = async () => {
                            const file = input.files?.[0];
                            if (!file) return;

                            // فایل رو به Base64 تبدیل کن
                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const base64 = e.target?.result;
                                if (base64 && editor) {
                                    editor
                                        .chain()
                                        .focus()
                                        .setImage({ src: base64 as string })
                                        .run();
                                }
                            };
                            reader.readAsDataURL(file);
                        };

                        input.click();
                    }}
                >
                    <ImageIcon size={16} />
                </Button>

                <div className="ml-auto flex gap-2">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().undo().run()}
                        className={btnClass}
                    >
                        <Undo size={16} />
                    </Button>
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() => editor.chain().focus().redo().run()}
                        className={btnClass}
                    >
                        <Redo size={16} />
                    </Button>
                </div>
            </div>

            {/* Editor */}
            <EditorContent
                editor={editor}
                className="border border-zinc-700 rounded-md min-h-[300px] bg-zinc-900 text-zinc-100 p-3 leading-relaxed"
            />
        </div>
    );
}
