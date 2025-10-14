import "@/ui/global.css";
import Header from "../ui/components/Header/Header";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="fa" dir="rtl">
            <body className={`text-primary`}>
                <Header />
                {children}
            </body>
        </html>
    );
}
