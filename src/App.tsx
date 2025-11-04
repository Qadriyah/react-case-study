import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { BoardPage } from "./pages/BoardPage";
import { IssueDetailPage } from "./pages/IssueDetailPage";
import { SettingsPage } from "./pages/SettingsPage";

export const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/board" element={<BoardPage />} />
        <Route path="/issue/:id" element={<IssueDetailPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/board" />} />
      </Routes>
    </Router>
  );
};
