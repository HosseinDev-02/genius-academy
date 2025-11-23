import "@/src/styles/global.css";
import Header from "@/src/components/layout/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/src/components/layout/Footer";
import { getMenuTree } from "@/src/lib/storage/menu-tree";
import HeaderProvider from "@/src/components/layout/HeaderProvider";
import RootLayoutProvider from "@/src/components/layout/LayoutProvider";

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // suppressHydrationWarning  خطای تم هنگام لود شدن صفحه با این کد رفع شد
    return (
        <RootLayoutProvider>
            <html lang="fa" dir="rtl" suppressHydrationWarning>
                <body className="font-YekanBakh-Regular text-caption bg-background">
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >
                        <div className="body-wrapper">
                            <HeaderProvider>
                                <Header />
                            </HeaderProvider>
                            {children}
                            <Footer />
                        </div>
                    </ThemeProvider>
                </body>
            </html>
        </RootLayoutProvider>
    );
}
