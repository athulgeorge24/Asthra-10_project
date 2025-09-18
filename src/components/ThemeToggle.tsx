import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      data-nopause

      className="p-2 rounded-lg border shadow-md transition
                 bg-transparent text-black dark:text-white
"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}
