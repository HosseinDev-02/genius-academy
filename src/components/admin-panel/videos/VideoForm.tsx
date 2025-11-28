"use client";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { createVideoSchema, updateVideoSchema } from "@/src/lib/data-schemas";
import { getShortSessions } from "@/src/lib/storage/sessions";
import { Session } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";
import { CldUploadButton } from "next-cloudinary";
import { uploadVideo } from "@/src/lib/utils/uploadVideo";
import { Loader2, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
    mode: "add" | "edit";
    videoId?: string;
    defaultValues?: z.infer<typeof updateVideoSchema>;
    sessions: Session[];
};

export default function VideoForm({
    mode,
    defaultValues,
    videoId,
    sessions,
}: Props) {
    const schema = mode === "add" ? createVideoSchema : updateVideoSchema;
    const fileRef = React.useRef<HTMLInputElement | null>(null);
    const [uploading, setUploading] = useState(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      title: "",
                      video: null,
                      duration: 0,
                      is_free: "premium",
                      session_id: "",
                  }
                : {
                      ...defaultValues,
                      is_free: defaultValues?.is_free ? "free" : "premium",
                  },
    });

    const watchVideo = form.watch("video");

    useEffect(() => {
        if (watchVideo) {
            console.log("watchVideo", watchVideo);
        }
    }, [watchVideo]);

    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log(values);
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("video", values.video);
            formData.append("duration", values.duration.toString());
            formData.append("is_free", values.is_free);
            formData.append("session_id", values.session_id);

            const method = mode === "add" ? "POST" : "PATCH";
            const url =
                mode === "add" ? "/api/videos" : `/api/videos/${videoId}`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });
            const result = await response.json();

            if (result.success) {
                if (method === "POST") {
                    form.reset();
                    fileRef.current!.value = "";
                } else if (method === "PATCH") router.refresh();
                toast.success(result.message);
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };
    return (
        <div dir="rtl">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit, (error) => {
                        console.log(error);
                    })}
                    className="space-y-10"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان فیلم
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="عنوان فیلم را وارد کنید"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="session_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        دوره
                                    </FormLabel>
                                    <FormControl>
                                        <Select
                                            onValueChange={field.onChange} // مقدار انتخابی رو به state فرم می‌فرسته
                                            value={field.value}
                                            dir="rtl"
                                        >
                                            <SelectTrigger className="w-full focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600">
                                                <SelectValue
                                                    className={`font-YekanBakh-SemiBold`}
                                                    placeholder="آموزش پروژه محور React"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {sessions?.map((session) => (
                                                    <SelectItem
                                                        key={session.id}
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        value={session.id}
                                                    >
                                                        {session.title}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="video"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        آدرس فیلم
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            ref={fileRef}
                                            className="border-zinc-600"
                                            type="file"
                                            accept="video/*"
                                            onLoad={() => {
                                                console.log("loaded");
                                            }}
                                            onChange={async (e) => {
                                                const file =
                                                    e.target.files?.[0];
                                                if (!file) return;
                                                setUploading(true);

                                                const { url, duration } =
                                                    await uploadVideo(file);

                                                setUploading(false);

                                                form.setValue("video", url, {
                                                    shouldValidate: true,
                                                });

                                                form.setValue(
                                                    "duration",
                                                    duration,
                                                    { shouldValidate: true }
                                                );

                                                toast.info(
                                                    "فایل با موفقیت آپلود شد."
                                                );
                                            }}
                                        />
                                    </FormControl>
                                    {uploading && (
                                        <div className="flex items-center justify-center rounded-full w-8 h-8">
                                            <LoaderCircle
                                                strokeWidth={4}
                                                size={32}
                                                className="animate-spin text-sky-700"
                                            />
                                        </div>
                                    )}
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            name="is_free"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>رایگان یا پریمیوم</FormLabel>
                                    <FormControl>
                                        <RadioGroup
                                            dir="rtl"
                                            onValueChange={field.onChange} // 👈 اتصال به فرم
                                            value={field.value}
                                            className="course-status flex flex-col space-y-1"
                                        >
                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="free"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    رایگان
                                                </FormLabel>
                                            </FormItem>
                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="premium"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    پریمیوم
                                                </FormLabel>
                                            </FormItem>
                                        </RadioGroup>
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            size={"lg"}
                            type="submit"
                            className="font-YekanBakh-SemiBold cursor-pointer"
                        >
                            {videoId ? "ویرایش ویدیو" : "افزودن ویدیو"}
                        </Button>
                    </div>
                </form>
            </Form>
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 2500,
                    classNames: {
                        success: "!bg-teal-700",
                        error: "!bg-red-700",
                        info: "!bg-sky-700 text-title",
                    },
                    className: "!text-white !border-none",
                }}
            />
        </div>
    );
}
