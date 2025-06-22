import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
const App = lazy(() => import("./App.jsx"));
import "./index.scss";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./context/index.js";
import LazyLoading from "./components/lazy/LazyLoading.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Suspense fallback={<LazyLoading />}>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </Suspense>
  </StrictMode>
);
