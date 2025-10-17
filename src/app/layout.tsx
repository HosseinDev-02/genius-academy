import "../styles/global.css";
import Header from "../components/layout/Header/Header";
import { ThemeProvider } from "next-themes";

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
                    </div>
                </ThemeProvider>
            </body>
        </html>
    );
}
