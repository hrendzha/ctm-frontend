import { Routes, Route } from "react-router-dom";
import { CssBaseline } from "@mui/material";
// import { PublicRoute } from "components/PublicRoute";
import { HomePage, ExercisesPage, SignInPage, SignUpPage } from "pages";
import { Layout } from "components/Layout";
import { AuthProvider } from "components/AuthProvider";

const App = () => {
  return (
    <AuthProvider>
      <CssBaseline />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/exercises" element={<ExercisesPage />} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<h1>Not found</h1>} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export { App };
