import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import ThemeIcon from "./ThemeIcon";

export const Navigation = () => {
  const { theme, setTheme } = useTheme();

  return (
    <nav className="navigation">
      <div>
        <Link to="/board" style={{ marginRight: "1rem" }}>
          Board
        </Link>
        <Link to="/settings">Settings</Link>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="clear-btn"
      >
        <ThemeIcon />
      </button>
    </nav>
  );
};
