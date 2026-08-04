"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

const ApplyModalContext = createContext(null);

export function ApplyModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [presetCourse, setPresetCourse] = useState(null);

  const open = useCallback((courseSlug) => {
    setPresetCourse(courseSlug || null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo(
    () => ({ isOpen, presetCourse, open, close }),
    [isOpen, presetCourse, open, close]
  );

  return <ApplyModalContext.Provider value={value}>{children}</ApplyModalContext.Provider>;
}

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) {
    throw new Error("useApplyModal must be used within an ApplyModalProvider");
  }
  return ctx;
}
