import React, { Suspense, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { FluentProvider } from "@fluentui/react-components";
import { MsalProvider, useMsal, UnauthenticatedTemplate } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HomePage, WelcomePage } from "./pages";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ApiConfigProvider } from "./context/ApiConfigContext";
import { earthTheme } from "./theme/earthTheme";
import { Provider as ReduxProvider } from "react-redux";
import { useAppSelector } from "./store/useAppSelector";
import store from "./store";
import PopupAuthOverlay from "./components/PopupAuthOverlay";
import { useIdentity } from "./hooks/useIdentity";

const msalConfig = {
  auth: {
    clientId: "acabfe2e-11cd-4ce0-acbe-94ee0548ead3",
    authority: "https://login.microsoftonline.com/consumers",
    redirectUri: window.location.origin,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};
const msalInstance = new PublicClientApplication(msalConfig);

// Vite environment variables must be prefixed with VITE_ to be exposed to the client
const appInsightsConnectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;
const appInsights = new ApplicationInsights({
  config: {
    connectionString: appInsightsConnectionString,
    enableAutoRouteTracking: true,
  },
});
appInsights.loadAppInsights();

// Export the Application Insights instance for use in other modules
export { appInsights };

const apiConfig = {
  apiUrl: import.meta.env.VITE_AZURE_AI_API_URL,
  apiScope: import.meta.env.VITE_AZURE_AI_SCOPE,
  senderName: "Vibetato",
};

const scopes = [
    "openid",
    "profile",
    "email",
    "User.Read",
    import.meta.env.VITE_AZURE_AI_SCOPE,
  ];

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accounts } = useMsal();
  if (!accounts || accounts.length === 0) {
    return <Navigate to="/welcome" replace />;
  }
  return <>{children}</>;
}

function LoginRoute() {
  const { accounts } = useMsal();
  if (accounts && accounts.length > 0) {
    return <Navigate to="/" replace />;
  }
  return (
    <UnauthenticatedTemplate>
      <WelcomePage scopes={scopes} />
    </UnauthenticatedTemplate>
  );
}

function useTrackPageViews(appInsights: ApplicationInsights) {
  const location = useLocation();
  useEffect(() => {
    appInsights.trackPageView({ name: location.pathname, uri: window.location.href });
  }, [location, appInsights]);
}

// Ensure MSAL handles the redirect promise and is initialized before rendering the app
msalInstance.initialize().then(() => {
  msalInstance.handleRedirectPromise().catch(e => {
    console.error(e);
  });
  const rootElement = document.querySelector("main");
  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<App />);
  } else {
    console.error("Main element not found");
  }
});

function App() {
  return (
    <ReduxProvider store={store}>
      <MsalProvider instance={msalInstance}>
        <ApiConfigProvider value={apiConfig}>
          <FluentProvider theme={earthTheme}>
            <PopupAuthOverlay scopes={scopes} />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </FluentProvider>
        </ApiConfigProvider>
      </MsalProvider>
    </ReduxProvider>
  );
}

function AppRoutes() {
  // Set authenticated user context for App Insights globally
  const { user } = useIdentity();
  React.useEffect(() => {
    const userEmail = user?.username || "";
    const userId = user?.localAccountId || user?.homeAccountId || undefined;
    if (userEmail && userId && appInsights?.setAuthenticatedUserContext) {
      appInsights.setAuthenticatedUserContext(userEmail, userId);
    }
  }, [user]);


  useTrackPageViews(appInsights);
  const errors = useAppSelector((state) => state.auth.errors); // subscribe to errors
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>              
              {errors.length === 0 ? <HomePage /> : null}
            </ProtectedRoute>
          }
        />
        <Route path="/welcome" element={<LoginRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
