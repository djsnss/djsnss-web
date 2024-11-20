import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loader from "./components/Loaders/loader2/CustomLoader2";

const Home = React.lazy(() => import("./pages/Landing"));

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="flex flex-col justify-between min-h-screen">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-300 to-white">
              <Loader className="h-40" />
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
};

export default App;
