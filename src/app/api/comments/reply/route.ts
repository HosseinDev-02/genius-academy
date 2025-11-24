import { sql } from "@/src/db";
import { revalidateTag } from "next/cache";
import { z } from "zod";

const replySchema = z.object({
  parent_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string().min(3, "متن پاسخ باید حداقل ۳ کاراکتر باشد"),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = replySchema.parse(body);

    // ✅ گرفتن اطلاعات کامنت اصلی
    const [parent] = await sql`
      SELECT * FROM comments WHERE id = ${data.parent_id}
    `;

    if (!parent)
      return Response.json({ error: "کامنت اصلی پیدا نشد" }, { status: 404 });

    // ✅ ایجاد پاسخ جدید
    const [reply] = await sql`
      INSERT INTO comments (content, user_id, parent_id, course_id, article_id, status)
      VALUES (
        ${data.content},
        ${data.user_id},
        ${data.parent_id},
        ${parent.course_id},
        ${parent.article_id},
        'approved' -- پاسخ‌ها معمولاً مستقیم تأیید می‌شن
      )
      RETURNING *;
    `;

    // ✅ همزمان تغییر وضعیت کامنت اصلی
    if (data.status) {
      await sql`
        UPDATE comments
        SET status = ${data.status}
        WHERE id = ${data.parent_id};
      `;
    }

    revalidateTag('comments');

    return Response.json({
      message: "پاسخ با موفقیت ارسال شد",
      reply,
      success: true,
    });

  } catch (err) {
    console.error(err);
    return Response.json({ error: "خطا در ارسال پاسخ" }, { status: 500 });
  }
}
