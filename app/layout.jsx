import "./globals.css";

export const metadata = {
  title: "FairLens | Unbiased AI Decision Platform",
  description: "Detect, mitigate, and report on algorithmic bias in your machine learning models.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
