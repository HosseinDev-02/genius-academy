import z from "zod";

export const createCourseSchema = z.object({
    title: z.string().min(3, "عنوان باید حداقل ۳ حرف باشد"),
    about: z.string().min(3, "توضیح باید حداقل ۳ حرف باشد"),
    user_id: z.string().nonempty("مدرس را انتخاب کنید"),
    category_id: z.string().nonempty("دسته‌بندی را وارد کنید"),
    price: z.coerce.number({
        required_error: "قیمت الزامی است",
        invalid_type_error: "قیمت باید عدد باشد",
    }),
    short_name: z.string().min(3, "نام کوتاه باید حداقل ۳ حرف باشد"),
    is_completed: z.enum(["isCompleted", "inProgress"], {
        errorMap: () => ({ message: "وضعیت را انتخاب کنید" }),
    }),
    content: z.any().refine((val) => Object.keys(val).length > 0, {
        message: "محتوای دوره را وارد کنید",
    }),
    image: z
        .any()
        .refine((file) => file instanceof File, "لطفاً یک تصویر انتخاب کنید"),
});

export const updateCourseSchema = createCourseSchema.extend({
    image: z.any().optional(),
})

export const createCategorySchema = z.object({
    title: z.string().nonempty("عنوان باید حداقل ۳ حرف باشد"),
    short_name: z.string().nonempty("نام کوتاه را وارد کنید"),
});