import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-[480px] flex-1 flex-col items-center justify-center px-6 pb-8 pt-6 text-center">
      <p className="text-h2 text-ink">این صفحه پیدا نشد</p>
      <p className="mt-2 text-body-sm text-muted-strong">
        آدرسی که دنبالش بودید وجود نداره یا جابه‌جا شده.
      </p>
      <Link href="/feed" className="mt-6 w-full">
        <Button variant="outline">بازگشت به فید</Button>
      </Link>
    </div>
  );
}
