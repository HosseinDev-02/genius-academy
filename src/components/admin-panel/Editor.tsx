"use client";

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { useEditor, EditorContent, mergeAttributes, Node } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Paragraph from "@tiptap/extension-paragraph";
import Heading, { HeadingOptions } from "@tiptap/extension-heading";
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
    Heading3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { extensions } from "@/src/lib/tiptapExtensions";
import { UploadButton } from "@bytescale/upload-widget-react";

type EditorProps = {
    value: any; // مقدار فعلی ادیتور
    onChange: (value: any) => void; // برای اطلاع دادن تغییرات به فرم
};

export type EditorRef = {
    reset: () => void; // متدی که از بیرون برای ریست کردن صدا می‌زنیم
};

const TiptapEditor = forwardRef<EditorRef, EditorProps>(
    ({ value, onChange }, ref) => {
        const editor = useEditor({
            extensions: extensions,
            content:
                value && Object.keys(value).length
                    ? value
                    : { type: "doc", content: [] },
            editorProps: {
                attributes: {
                    class: cn(
                        "prose prose-sm sm:prose lg:prose-lg focus:outline-none min-h-[400px] p-4 rounded-md border",
                        "bg-zinc-900 border-zinc-600 text-zinc-100 dark:prose-invert focus:border-primary transition-colors duration-300",
                        "text-right leading-relaxed"
                    ),
                    dir: "rtl",
                },
            },
            onUpdate: ({ editor }) => {
                const json = editor.getJSON();
                onChange(json);
            },
            immediatelyRender: false,
        });

        useImperativeHandle(ref, () => ({
            reset: () => {
                editor?.commands.clearContent();
            },
        }));

        useEffect(() => {
            return () => editor?.destroy();
        }, [editor]);

        useEffect(() => {
            if (editor && value) {
                editor.commands.setContent(value);
            }
        }, [editor, value]);

        if (!editor) return null;

        const activeClass = "bg-primary text-white";
        const btnClass = "h-8 w-8 p-0 rounded-md cursor-pointer";

        const options = {
            apiKey: "public_G22nj3CCdK2sZbdR9c1ePkh2agx4", // یا API KEY خودت
            path: {
                folderPath: 'genius-academy/images/editor',
            } 
        };

        return (
            <div className="w-full">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 border border-zinc-600 rounded-md p-2 mb-3 bg-zinc-800 backdrop-blur">
                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor.chain().focus().toggleBold().run()
                        }
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
                        onClick={() =>
                            editor.chain().focus().toggleItalic().run()
                        }
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
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 2 })
                                .run()
                        }
                        className={cn(
                            btnClass,
                            editor.isActive("heading", { level: 2 }) &&
                                activeClass
                        )}
                    >
                        <Heading2 size={16} />
                    </Button>

                    <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={() =>
                            editor
                                .chain()
                                .focus()
                                .toggleHeading({ level: 3 })
                                .run()
                        }
                        className={cn(
                            btnClass,
                            editor.isActive("heading", { level: 3 }) &&
                                activeClass
                        )}
                    >
                        <Heading3 size={16} />
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
                                editor
                                    .chain()
                                    .focus()
                                    .setLink({ href: url })
                                    .run();
                        }}
                        className={btnClass}
                    >
                        <LinkIcon size={16} />
                    </Button>

                    <UploadButton
                        options={options}
                        onComplete={(files) => {
                            console.log("Uploaded Files:", files);

                            // آدرس فایل:
                            console.log("File URL:", files[0].fileUrl);

                            editor
                                .chain()
                                .focus()
                                .setImage({ src: files[0].fileUrl })
                                .run();
                        }}
                    >
                        {({ onClick }) => (
                            <Button
                                type="button"
                                onClick={onClick}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                            >
                                آپلود تصویر
                            </Button>
                        )}
                    </UploadButton>

                    {/* <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        className={cn(btnClass)}
                        onClick={() => {
                            // یه input مخفی می‌سازیم
                            const input = document.createElement("input");
                            input.type = "file";
                            input.accept = "image/*";

                            input.onchange = async () => {
                                const file = input.files?.[0];
                                if (!file || !editor) return;

                                // ارسال فایل به سرور
                                const formData = new FormData();
                                formData.append("image", file);

                                try {
                                    const res = await fetch("/api/uploads", {
                                        method: "POST",
                                        body: formData,
                                    });

                                    if (!res.ok) {
                                        console.error("Upload failed");
                                        return;
                                    }

                                    const data = await res.json();

                                    // فرض می‌کنیم API ما { fileName: "...", url: "..." } برمی‌گردونه
                                    const imageUrl =
                                        data.url || `/uploads/${data.fileName}`;

                                    editor
                                        .chain()
                                        .focus()
                                        .setImage({ src: imageUrl })
                                        .run();
                                } catch (err) {
                                    console.error(
                                        "Error uploading image:",
                                        err
                                    );
                                }
                            };

                            input.click();
                        }}
                    >
                        <ImageIcon size={16} />
                    </Button> */}

                    <div className="ml-auto flex flex-row-reverse gap-2">
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
                    className="rounded-md min-h-[400px] bg-zinc-900 text-zinc-100 leading-relaxed"
                />
            </div>
        );
    }
);

export default TiptapEditor;
