"use client";
import { useEffect } from "react";

export default function ScrollRestoration() {
  useEffect(() => {
    history.scrollRestoration = "manual";   // <— the key fix

    return () => {
      history.scrollRestoration = "auto";
    };
  }, []);

  return null;
}
