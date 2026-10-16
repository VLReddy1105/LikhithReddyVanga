/* Neural Monochrome — App root */
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import { lazy, Suspense } from "react";
import { MotionConfig } from "framer-motion";
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/projects/:slug"} component={ProjectDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" switchable>
        <MotionConfig reducedMotion="user">
          <Suspense
            fallback={
              <main className="container portfolio-section" role="status">
                Loading case study…
              </main>
            }
          >
            <Router />
          </Suspense>
        </MotionConfig>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
