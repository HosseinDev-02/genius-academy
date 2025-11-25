"use client";
import React from "react";
import { useAuthContext } from "../../layout/LayoutProvider";
import SubTitle from "../../ui/SubTitle";
import PrimaryButton from "../../ui/button/PrimaryButton";
import { LucideArrowUpLeft } from "lucide-react";
import { CourseWithRelations, User } from "@/src/lib/type-definition";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";

const schema = z.object({
    content: z.string().min(3, "متن پاسخ باید حداقل ۳ کاراکتر باشد"),
});

export default function CommentForm({
    courseId,
    articleId,
    user
}: {
    courseId?: string | null;
    articleId?: string | null;
    user: User | null;
}) {
    const form = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            content: "",
        },
    });
    const router = useRouter();

    const onSendCommentHandler = async (values: z.infer<typeof schema>) => {
        try {
            console.log("values :", values);

            const commentInfo = {
                content: values.content,
                course_id: courseId || null,
                article_id: articleId || null,
                parent_id: null,
                user_id: user?.id,
            };

            const response = await fetch("/api/comments", {
                method: "POST",
                body: JSON.stringify(commentInfo),
            });

            const result = await response.json();
            console.log("result :", result);
            console.log("response :", response);

            if (result.success) {
                toast.success(result.message);
                form.reset();
                router.refresh();
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
        <div>
            {user ? (
                <div className="p-5 rounded-3xl my-5 border border-border">
                    <SubTitle
                        className="text-xs mb-5"
                        title="ارسال دیدگاه یا پرسش"
                    ></SubTitle>
                    <Form {...form}>
                        <form
                            className="space-y-5 flex flex-col items-end"
                            onSubmit={form.handleSubmit(onSendCommentHandler)}
                        >
                            <div className="w-full">
                                <FormField
                                    control={form.control}
                                    name="content"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormControl>
                                                <Textarea
                                                    rows={10}
                                                    placeholder="متن مورد نظر خود را وارد کنید ..."
                                                    {...field}
                                                    className="focus-visible:ring-1 focus-visible:ring-primary focus-visible:border-1 focus-visible:border-primary transition-all duration-300 border-none border-zinc-600 min-h-60 p-5 bg-secondary rounded-xl text-sm text-title overflow-hidden w-full outline-none"
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
                                    className="font-YekanBakh-SemiBold cursor-pointer flex sm:inline-flex items-center justify-center gap-2 bg-primary rounded-full text-white h-11 transition-opacity hover:opacity-80 text-xs xl:text-sm px-4"
                                >
                                    <span>ثبت دیدگاه یا پرسش</span>
                                    <LucideArrowUpLeft size={20} />
                                </Button>
                            </div>
                        </form>
                    </Form>
                    <Toaster
                        position="top-right"
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
            ) : (
                <h3 className="font-YekanBakh-SemiBold text-title my-5">
                    برای ارسال دیدگاه و پرسش باید وارد شوید
                </h3>
            )}
        </div>
    );
}
