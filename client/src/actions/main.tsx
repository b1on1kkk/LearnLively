import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "react-redux";
import { store } from "./store/store.ts";

import { BugReport } from "./components/BugReport/BugReport.tsx";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <NextUIProvider>
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <Provider store={store}>
          <App />
          <BugReport />
        </Provider>
      </NextThemesProvider>
    </NextUIProvider>
  </QueryClientProvider>
);
