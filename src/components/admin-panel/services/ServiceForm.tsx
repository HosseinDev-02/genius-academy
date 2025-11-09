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
import { createServiceSchema } from "@/src/lib/data-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof createServiceSchema>;
    serviceId?: string;
};

export default function ServiceForm({ mode, defaultValues, serviceId }: Props) {
    const form = useForm<z.infer<typeof createServiceSchema>>({
        resolver: zodResolver(createServiceSchema),
        defaultValues: defaultValues || {
            title: "",
            key: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof createServiceSchema>) => {
        try {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("key", values.key);
            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add" ? "/api/services" : `/api/services/${serviceId}`;

            const response = await fetch(url, {
                method: method,
                body: formData,
            });

            if (response.ok) {
                toast.success(
                    mode === "add"
                        ? "سرویس با موفقیت ثبت شد"
                        : "سرویس با موفقیت ویرایش شد"
                );
                form.reset();
            } else {
                throw new Error(
                    mode === "add"
                        ? "Failed To Add New Service"
                        : "Failed To Edit Service"
                );
            }
        } catch (error) {
            toast.error(
                mode === "add"
                    ? "هنگام افزودن سرویس خطایی رخ داد"
                    : "هنگام ویرایش سرویس خطایی رخ داد"
            );
        }
    };

    return (
        <div>
            <Form {...form}>
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان سرویس
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="پروژه محور"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="key"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        کلید سرویس
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="mentorship"
                                            {...field}
                                        />
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
                            {serviceId ? "ویرایش سرویس" : "افزودن سرویس"}
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
