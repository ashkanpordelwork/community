"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import { BottomSheet } from "./BottomSheet";
import { Button } from "./Button";

interface PickerFieldProps {
  label: string;
  value: string;
  placeholder?: string;
  defaultDraft: string;
  displayValue: (value: string) => string;
  onConfirm: (value: string) => void;
  renderPicker: (draft: string, setDraft: (v: string) => void) => ReactNode;
}

export function PickerField({
  label,
  value,
  placeholder = "انتخاب کنید",
  defaultDraft,
  displayValue,
  onConfirm,
  renderPicker,
}: PickerFieldProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(value || defaultDraft);

  const openSheet = () => {
    setDraft(value || defaultDraft);
    setOpen(true);
  };

  const confirm = () => {
    onConfirm(draft);
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={openSheet}
        className="flex h-14 w-full items-center justify-between rounded-pill border-2 border-transparent bg-surface px-5 text-body text-ink outline-none focus:border-ink focus:bg-paper"
      >
        <span className={value ? "text-ink" : "text-muted"}>
          {value ? displayValue(value) : placeholder}
        </span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 text-muted">
          <path
            d="m6 9 6 6 6-6"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <BottomSheet open={open} onClose={() => setOpen(false)}>
        <p className="text-center text-h2 text-ink">{label}</p>
        <div className="mt-4">{renderPicker(draft, setDraft)}</div>
        <div className="mt-6">
          <Button onClick={confirm}>تأیید</Button>
        </div>
      </BottomSheet>
    </>
  );
}
