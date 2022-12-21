import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Backdrop, CircularProgress } from "@mui/material";
import {
  HomePage,
  ExercisesPage,
  SignInPage,
  SignUpPage,
  SetPage,
  RememberEverythingPage,
} from "pages";
import { Layout } from "components/Layout";
import { PublicRoute } from "components/PublicRoute";
import { PrivateRoute } from "components/PrivateRoute";
import { useAuth } from "hooks";

const App = () => {
  const auth = useAuth();
  const [isFetchCurrentUserLoading, setIsFetchCurrentUserLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        setIsFetchCurrentUserLoading(true);
        await auth.getCurrentUser();
      } catch (error) {
      } finally {
        setIsFetchCurrentUserLoading(false);
      }
    };

    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetchCurrentUserLoading) {
    return (
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={isFetchCurrentUserLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
        <Route
          path="/set"
          element={
            <PrivateRoute redirectTo="/sign-in">
              <SetPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/exercises"
          element={
            <PrivateRoute redirectTo="/sign-in">
              <ExercisesPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/remember-everything"
          element={
            <PrivateRoute redirectTo="/sign-in">
              <RememberEverythingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/sign-in"
          element={
            <PublicRoute restricted>
              <SignInPage />
            </PublicRoute>
          }
        />
        <Route
          path="/sign-up"
          element={
            <PublicRoute restricted>
              <SignUpPage />
            </PublicRoute>
          }
        />
        <Route path="*" element={<h1>Not found</h1>} />
      </Route>
    </Routes>
  );
};

export { App };
