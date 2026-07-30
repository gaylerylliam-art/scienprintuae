export const metadata = {
  title: "ScienPrintUAE | Premium Printing in Dubai",
  description: "Premium UAE printing catalogue for laser printing, UV printing, DTF, offset printing, silk screen printing, embroidery, and custom print quotes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        {children}
        <script src="/app.js" defer></script>
      </body>
    </html>
  );
}