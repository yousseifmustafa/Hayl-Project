import RootLayout from "@/app/RootLayout";

export const metadata = {
  title: "El Hayl - Packing & Disposable Products Supplier",
  description:
    "El Hayl provides high-quality packing and disposable products for restaurants, coffee shops, hotels, hospitals, and home consumers.",
  keywords:
    "packing products, disposable products, food packaging, plastic cups, paper cups, foil containers, custom printing, food delivery packaging, hygiene products",
  authors: [{ name: "El Hayl" }],
  robots: "index, follow",
  openGraph: {
    title: "El Hayl - Packing & Disposable Products Supplier",
    description:
      "We supply all paper, plastic, foil, and wood tableware and delivery packing solutions for restaurants, coffee shops, hotels, hospitals, and home consumers.",
    url: "https://alhayl.com",
    siteName: "El Hayl",
    images: [
      {
        url: "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738880266/Logo_n4drwz.png",
        width: 800,
        height: 600,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "El Hayl - Packing & Disposable Products Supplier",
    description:
      "We supply all kinds of packing and disposable products for various industries including restaurants and hospitals.",
    images: [
      "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738880266/Logo_n4drwz.png",
    ],
  },
  icons: {
    icon: "https://res.cloudinary.com/dl9gghlyx/image/upload/v1738881188/Icon_ttv4ph.png",
  },
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <RootLayout>{children}</RootLayout>
      </body>
    </html>
  );
}
