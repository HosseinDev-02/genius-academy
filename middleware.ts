// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// const PUBLIC_PATHS = ["/login", "/register", "/api", "/_next", "/favicon.ico"];

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
//   console.log('pathname :', pathname);

//   // اجازه برای مسیرهای عمومی
//   if (PUBLIC_PATHS.some(p => pathname.startsWith(p))) return NextResponse.next();

//   const token = req.cookies.get("auth_token")?.value;
//   if (!token) {
//     // redirect to login
//     const url = req.nextUrl.clone();
//     url.pathname = "/login";
//     return NextResponse.redirect(url);
//   }

//   // اگر نیاز داری اعتبار کامل انجام بشه -> در سرور route انجام بده (مطمئن‌تر)
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
// };
