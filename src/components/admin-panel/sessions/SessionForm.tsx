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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    createSessionSchema,
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
    mode: "add" | "edit";
    defaultValues?: z.infer<typeof updateSessionSchema>;
    sessionId?: string;
    shortCourses: Course[];
};

export default function SessionForm({
    mode,
    defaultValues,
    sessionId,
    shortCourses: courses,
}: Props) {
    const schema = mode === "add" ? createSessionSchema : updateSessionSchema;
    // const [courses, setCourses] = React.useState<Course[]>([]);
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues:
            mode === "add"
                ? {
                      title: "",
                      description: "",
                      course_id: "",
                  }
                : defaultValues,
    });
    const router = useRouter();

    const onSubmit = async (values: z.infer<typeof schema>) => {
        try {
            const sessionObj = {
                title: values.title,
                description: values.description,
                course_id: values.course_id,
            };
            const method = mode === "add" ? "POST" : "PUT";
            const url =
                mode === "add" ? "/api/sessions" : `/api/sessions/${sessionId}`;

            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(sessionObj),
            });
            const result = await response.json();
            if (result.success) {
                if(method === 'POST') form.reset();
                else if(method === 'PUT') router.refresh();
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
                    className="space-y-10"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        عنوان سرفصل
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600"
                                            placeholder="فصل اول"
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
                                                    placeholder="آموزش پروژه محور React"
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
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-gray-400 font-YekanBakh-SemiBold mb-2">
                                        توضیحات سرفصل
                                    </FormLabel>
                                    <FormControl>
                                        <Textarea
                                            rows={20}
                                            placeholder="توضیحات مختصر سرفصل ..."
                                            {...field}
                                            className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-zinc-600 min-h-40 resize-none"
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
                            {sessionId ? "ویرایش سرفصل" : "افزودن سرفصل"}
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
