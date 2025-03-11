"use client";

import React from "react";
import { useTheme } from "../context/ThemeContext";

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  function toggleTheme() {
    // Exemplo simples de troca entre dois temas
    if (theme.primary === "#1E3A8A") {
      setTheme({
        primary: "#111827",
        secondary: "#E5E7EB",
      });
    } else {
      setTheme({
        primary: "#1E3A8A",
        secondary: "#D1D5DB",
      });
    }
  }

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 bg-white text-black rounded shadow"
    >
      Trocar Tema
    </button>
  );
}
