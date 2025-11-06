import { sql } from "@/src/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params; // ✅ await لازم است
    if (!id) {
      return NextResponse.json({ error: "شناسه نامعتبر است" }, { status: 400 });
    }

    // اجرای Query حذف
    const result = await sql`DELETE FROM courses WHERE id = ${id}`;

    // چون delete چیزی برنمی‌گردونه، فقط پیام موفقیت
    return NextResponse.json({ message: "دوره با موفقیت حذف شد", id }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "خطایی در حذف دوره رخ داد" },
      { status: 500 }
    );
  }
}
