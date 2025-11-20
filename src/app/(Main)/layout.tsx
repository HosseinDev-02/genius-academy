import '@/src/styles/global.css'
import Header from "@/src/components/layout/Header";
import { ThemeProvider } from "next-themes";
import Footer from "@/src/components/layout/Footer";
import { getMenuTree } from '@/src/lib/storage/menu-tree';

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const menuTree = await getMenuTree()
    console.log('menu tree :', menuTree);
    // suppressHydrationWarning  خطای تم هنگام لود شدن صفحه با این کد رفع شد
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <body className='font-YekanBakh-Regular text-caption bg-background'>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="body-wrapper">
                        <Header menuTree={menuTree}/>
                        {children}
                        <Footer/>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
