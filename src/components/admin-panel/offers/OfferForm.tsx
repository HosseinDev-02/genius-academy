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
import { Textarea } from "@/components/ui/textarea";
import {
    createOfferSchema,
    createSessionSchema,
    updateOfferSchema,
    updateSessionSchema,
} from "@/src/lib/data-schemas";
import { getShortCourses } from "@/src/lib/storage/courses";
import { Course } from "@/src/lib/type-definition";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "sonner";
import z from "zod";

type Props = {
    courses: Course[];
};

export default function OfferForm({ courses }: Props) {
    const schema = createOfferSchema;

    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            code: "",
            discount_percent: 0,
            is_active: "active",
            course_id: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
        console.log(values);
        try {
            const offerInfo = {
                code: values.code,
                discount_percent: values.discount_percent,
                is_active: values.is_active,
                course_id: values.course_id,
            };
            const response = await fetch("/api/offers", {
                method: "POST",
                body: JSON.stringify(offerInfo),
            });
            const result = await response.json();

            if (result.success) {
                toast.success(result.message);
                form.reset();
            } else {
                throw new Error(result.error);
            }
        } catch (error) {
            console.log(error);
            toast.error(
                error instanceof Error ? error.message : "خطایی رخ داد"
            );
        }
    };

    return (
        <div dir="rtl">
            <Form {...form}>
                <form
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        کد تخفیف
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="react-10"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="course_id"
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
                                                    placeholder="انتخاب دوره"
                                                />
                                            </SelectTrigger>
                                            <SelectContent className="bg-zinc-800 border-none">
                                                {courses?.map((course) => (
                                                    <SelectItem
                                                        key={course.id}
                                                        className="cursor-pointer hover:bg-gray-200 hover:text-title"
                                                        value={course.id}
                                                    >
                                                        {course.title}
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
                            name="discount_percent"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        درصد تخفیف
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="200000"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="form-message" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            name="is_active"
                            render={({ field }) => (
                                <FormItem className="space-y-3">
                                    <FormLabel>وضعیت تخفیف</FormLabel>
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
                                                        value="active"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    فعال
                                                </FormLabel>
                                            </FormItem>

                                            <FormItem className="flex items-center space-x-3 space-x-reverse">
                                                <FormControl>
                                                    <RadioGroupItem
                                                        className="border-teal-800 border-2 ring-teal-800 text-teal-800 focus-visible:ring-teal-800"
                                                        value="inactive"
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    غیر فعال
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
                            اعمال تخفیف
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
