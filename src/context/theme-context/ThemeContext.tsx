import { createContext, useContext, useEffect, useState } from "react";

interface ThemeContextInterface {
  theme: string;
  toggleTheme: (theme: string) => void;
}

interface ThemeProps {
  children?: React.ReactNode;
}

const ThemeContext = createContext<ThemeContextInterface>({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<ThemeProps> = ({
  children,
}: ThemeProps) => {
  const [theme, setTheme] = useState("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme) {
      setTheme(localTheme);
    } else {
      localStorage.setItem("theme", "light");
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
