"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface OnboardingData {
  phone: string;
  name: string;
  tags: string[];
  avatarDataUrl: string | null;
}

interface OnboardingContextValue extends OnboardingData {
  setPhone: (v: string) => void;
  setName: (v: string) => void;
  setTags: (v: string[]) => void;
  setAvatarDataUrl: (v: string | null) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | null>(null);

  return (
    <OnboardingContext.Provider
      value={{ phone, setPhone, name, setName, tags, setTags, avatarDataUrl, setAvatarDataUrl }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) throw new Error("useOnboarding must be used within OnboardingProvider");
  return ctx;
}
