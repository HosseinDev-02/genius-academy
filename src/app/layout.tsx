import "../styles/global.css";
import Header from "../components/layout/Header";
import { ThemeProvider } from "next-themes";
import Footer from "../components/layout/Footer";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    // suppressHydrationWarning  خطای تم هنگام لود شدن صفحه با این کد رفع شد
    return (
        <html lang="fa" dir="rtl" suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <div className="body-wrapper">
                        <Header />
                        {children}
                        <Footer/>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
