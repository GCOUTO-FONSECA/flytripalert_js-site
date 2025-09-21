// app/br/layout.tsx
import Footer from "@/components/Footer";

export default function BrLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Footer region="br" />
    </>
  );
}
