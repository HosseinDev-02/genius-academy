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
import { getShortSessions } from "@/src/lib/actions";
import { createVideoSchema, updateVideoSchema } from "@/src/lib/data-schemas";
import { Session } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    mode: "add" | "edit";
    videoId?: string;
    defaultValues?: z.infer<typeof updateVideoSchema>;
};

export default function VideoForm({ mode, defaultValues, videoId }: Props) {
    const schema = mode === "add" ? createVideoSchema : updateVideoSchema;
    const [sessions, setSessions] = React.useState<Session[]>([]);
    const fileRef = React.useRef<HTMLInputElement | null>(null);
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
                : defaultValues,
    });

    React.useEffect(() => {
        const fetchSessions = async () => {
            try {
                const data = await getShortSessions();
                console.log("sessions :", data);
                setSessions(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchSessions();
    }, []);

    const handleFileChange = (file: File) => {
        const video = document.createElement("video");
        video.preload = "metadata";

        video.onloadedmetadata = () => {
            window.URL.revokeObjectURL(video.src);
            const duration = video.duration; // بر حسب ثانیه
            form.setValue("duration", duration); // مقداردهی در فرم
        };

        video.src = URL.createObjectURL(file);
    };

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("video", values.video);
            formData.append("duration", values.duration.toString());
            formData.append("is_free", values.is_free);
            formData.append("session_id", values.session_id);

            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add" ? "/api/videos" : `/api/videos/${videoId}`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            console.log("response :", response);

            if (response.ok) {
                toast.success(
                    mode === "add"
                        ? "فیلم با موفقیت افزوده شد"
                        : "فیلم با موفقیت ویرایش شد"
                );
                form.reset();
            } else {
                throw new Error(
                    mode === "add"
                        ? "Failed To Add New Video"
                        : "Failed To Edit Video"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add" ? "خطا در افزودن فیلم" : "خطا در ویرایش فیلم"
            );
        }
        console.log("values :", values);
    };
    return (
        <div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
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

                        {/* <FormField
                            control={form.control}
                            name="duration"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        مدت زمان فیلم
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="مدت زمان فیلم را وارد کنید"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        /> */}

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
                                            onChange={(e) => {
                                                const file =
                                                    e.target.files?.[0]!;
                                                console.log(file);
                                                field.onChange(file);
                                                handleFileChange(file);
                                            }}
                                        />
                                    </FormControl>
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
                    },
                    className: "!text-white !border-none",
                }}
            />
        </div>
    );
}
