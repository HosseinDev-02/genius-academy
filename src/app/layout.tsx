import '@/ui/global.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir='rtl'>
      <body
        className={`text-primary`}
      >
        {children}
      </body>
    </html>
  );
}
