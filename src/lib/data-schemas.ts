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
});

export const createCategorySchema = z.object({
    title: z.string().nonempty("عنوان باید حداقل ۳ حرف باشد"),
    short_name: z.string().nonempty("نام کوتاه را وارد کنید"),
});

export const createUserSchema = z.object({
    name: z.string().nonempty("نام را وارد کنید"),
    email: z.string().optional(),
    password: z.string().min(8, "رمز عبور باید حداقل ۸ حرف باشد"),
    phone_number: z.string().nonempty("شماره تماس را وارد کنید"),
    role: z.enum(["user", "teacher", "author", "admin"], {
        errorMap: () => ({ message: "نقش را انتخاب کنید" }),
    }),
    image: z
        .any()
        .refine((file) => file instanceof File, "لطفاً یک تصویر انتخاب کنید"),
    about: z.string().optional(),
});

export const updateUserSchema = createUserSchema.extend({
    image: z.any().optional(),
    password: z.string().optional(),
});

export const createArticleSchema = z.object({
    title: z.string().min(8, "عنوان باید حداقل ۸ حرف باشد"),
    category_id: z.string().nonempty("دسته‌بندی را انتخاب کنید"),
    user_id: z.string().nonempty("نویسنده را انتخاب کنید"),
    time_read: z.coerce.number().min(1, "زمان خواندن باید حداقل ۱ دقیقه باشد"),
    about: z.string().nonempty(),
    short_name: z.string().min(3, "نام کوتاه باید حداقل ۳ حرف باشد"),
    image: z
        .any()
        .refine((file) => file instanceof File, "لطفاً یک تصویر انتخاب کنید"),
    content: z.any().refine((val) => Object.keys(val).length > 0, {
        message: "محتوای مقاله را وارد کنید",
    }),
});

export const updateArticleSchema = createArticleSchema.extend({
    image: z.any().optional(),
});

export const createServiceSchema = z.object({
    title: z.string().nonempty("عنوان را وارد کنید"),
    key: z.string().nonempty("کلید را وارد کنید"),
});

export const createMenuSchema = z.object({
    title: z.string().nonempty(""),
    url: z.string().nonempty(""),
    order_index: z.coerce.number(),
});

export const updateMenuSchema = createMenuSchema.extend({});

export const createSubmenuSchema = createMenuSchema.extend({
    menu_id: z.string(),
});

export const updateSubmenuSchema = createSubmenuSchema.extend({});

export const createSubSubmenuSchema = createMenuSchema.extend({
    submenu_id: z.string(),
});

export const updateSubSubmenuSchema = createSubSubmenuSchema.extend({});
