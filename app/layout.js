import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Lead Fitout Calculator",
  description:
    "Lead Fitout Calculator is a specialized web tool designed for estimating renovation costs for various property types in Dubai, including villas, apartments, townhouses, and commercial spaces. The calculator enables users to specify area, select property type, service type (e.g., design or fitout), and instantly receive information on estimated work duration and potential discounts. Built with an intuitive interface, the tool simplifies complex renovation planning by providing a direct WhatsApp link to communicate project details for further assistance. Ideal for property managers, owners, and contractors, this tool is tailored to support Lead Fitout's commitment to transparent and efficient renovation services.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/lead-fav.png" type="image/png" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
