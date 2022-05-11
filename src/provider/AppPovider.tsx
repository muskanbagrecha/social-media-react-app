import { ThemeProvider } from "../context";

interface Props {
  children: React.ReactNode;
}

export const AppPovider = ({ children }: Props) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
