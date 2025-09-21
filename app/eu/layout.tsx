// app/eu/layout.tsx
import Footer from "@/components/Footer";

export default function EuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer region="eu" />
    </>
  );
}
