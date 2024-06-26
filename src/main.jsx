import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoggedInUserProvider } from "./context/LoggedInUserContext.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import NavBar from "./components/NavBar.jsx";
import ProfileDetail from "./pages/ProfileDetail.jsx";
import ProjectDetail from "./pages/ProjectDetail.jsx";
import Projects from "./pages/Projects.jsx";
import AddProject from "./pages/Projects/AddProject.jsx";
import { ThemeProvider } from "@mui/material";
import { lightTheme, darkTheme } from "./utils/theme.js";
import CssBaseline from "@mui/material/CssBaseline";


const Main = () => {
  const [themeMode, setThemeMode] = React.useState('dark');

  const theme = React.useMemo(() => {
    return themeMode === 'light' ? lightTheme : darkTheme;
  }, [themeMode]);

  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <React.StrictMode>
      <LoggedInUserProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline /> {/* Ensure CssBaseline is included */}
          <Router>
            <NavBar toggleTheme={toggleTheme} themeMode={themeMode} />
            <Routes>
              <Route path="/" element={<App />} errorElement={<div>Error</div>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile/:id" element={<ProfileDetail />} />
              <Route path="/profile/projects/" element={<Projects />} />
              <Route path="/project/:id" element={<ProjectDetail />} />
              <Route path="/project/add" element={<AddProject />} />
              <Route path="*" element={<div>Not Found</div>} />
            </Routes>
          </Router>
        </ThemeProvider>
      </LoggedInUserProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Main />);