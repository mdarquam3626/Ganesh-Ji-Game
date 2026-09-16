import React, { useState, useEffect } from "react";

export function showToast(message) {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("gjem-show-toast", { detail: message }));
  }
}

export function Toast() {
  const [toast, setToast] = useState({ text: "", visible: false });

  useEffect(() => {
    let timeoutId;
    const handleToast = (e) => {
      const msg = e.detail;
      setToast({ text: msg, visible: true });
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 2800);
    };

    window.addEventListener("gjem-show-toast", handleToast);
    return () => {
      window.removeEventListener("gjem-show-toast", handleToast);
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div
      id="toast"
      className={toast.visible ? "show" : ""}
      role="status"
      aria-live="polite"
    >
      {toast.text}
    </div>
  );
}
