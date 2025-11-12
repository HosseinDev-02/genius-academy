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

export const createCommentSchema = z
    .object({
        content: z.string().nonempty("محتوای نظر را وارد کنید"),
        course_id: z.string().uuid().optional().nullable(),
        article_id: z.string().uuid().optional().nullable(),
        user_id: z.string().nonempty("کاربر مربوطه را انتخاب کنید"),
        parent_id: z.string().uuid().optional().nullable(),
        status: z.enum(["pending", "approved", "rejected"], {
            errorMap: () => ({ message: "وضعیت را انتخاب کنید" }),
        }),
        target_type: z.enum(["article", "course"], {
            errorMap: () => ({ message: "نوع مقاله یا دوره را انتخاب کنید" }),
        }),
    })
    .refine(
        (data) => {
            // یکی از course_id یا article_id باید مقدار داشته باشه، یا parent_id
            const hasTarget =
                data.course_id || data.article_id || data.parent_id;
            return !!hasTarget;
        },
        {
            message: "باید برای دوره، مقاله یا پاسخ به کامنت باشد",
            path: ["course_id"], // مسیر خطا
        }
    )
    .refine((data) => !(data.course_id && data.article_id), {
        message: "کامنت نمی‌تواند همزمان برای دوره و مقاله باشد",
        path: ["course_id"],
    });

export const updateCommentSchema = createCommentSchema;

export const createSessionSchema = z.object({
    title: z.string().min(3, "عنوان باید حداقل ۳ حرف باشد"),
    description: z.string().nonempty("توضیح باید وارد شود"),
    course_id: z.string().uuid().nonempty("دوره را انتخاب کنید"),
});

export const updateSessionSchema = createSessionSchema.extend({});

export const createVideoSchema = z.object({
    title: z.string().nonempty("عنوان باید وارد شود"),
    duration: z.coerce
        .number()
        .refine((val) => val > 0, "مدت زمان باید بزرگتر از صفر باشد"),
    video: z
        .any()
        .refine((file) => file instanceof File, "لطفاً یک فیلم انتخاب کنید"),
    session_id: z.string().uuid().nonempty("دوره را انتخاب کنید"),
    is_free: z.enum(["free", "premium"], {
        errorMap: () => ({ message: "نوع ویدیو را انتخاب کنید" }),
    }),
});

export const updateVideoSchema = createVideoSchema.extend({
    video: z.any().optional(),
});
