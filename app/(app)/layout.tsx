import { BottomNav } from "@/components/ui/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col">
      <div className="flex-1">{children}</div>
      <BottomNav />
    </div>
  );
}
