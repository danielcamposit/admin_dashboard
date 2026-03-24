import "./globals.css";

export const metadata = {
  title: "Admin Dashboard Pro",
  description: "Professional admin dashboard with Next.js, Neon and custom API.",
};

const themeScript = `
  try {
    const savedTheme = localStorage.getItem("theme") || "light";
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  } catch (error) {
    document.documentElement.classList.remove("dark");
  }
`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
