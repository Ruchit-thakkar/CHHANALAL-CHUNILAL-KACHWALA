"use client";

import { useEffect } from "react";

export default function AdminServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/admin-sw.js", { scope: "/admin/" })
          .then((registration) => {
            console.log("CCK Admin Service Worker registered:", registration.scope);
          })
          .catch((error) => {
            console.error("CCK Admin Service Worker registration failed:", error);
          });
      });
    }
  }, []);

  return null;
}
