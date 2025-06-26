import React, { useState } from "react";
import { tokens } from "@fluentui/react-theme";
import { Button } from "@fluentui/react-components";
import { useAppSelector } from "../../store/useAppSelector";
import { useAppDispatch } from "../../store/useAppDispatch";
import { clearErrors, clearCustomScopeErrors } from "../../store/authSlice";
import { useMsal } from "@azure/msal-react";

export default function PopupAuthOverlay({
  scopes,
  customScopes,
}: {
  scopes: string[];
  customScopes: string[];
}) {
  // Read errors from Redux
  const errors = useAppSelector((state) => state.auth.errors);
  const customScopeErrors = useAppSelector(
    (state) => state.auth.customScopeErrors
  );
  const error = errors.length > 0 ? errors[errors.length - 1] : undefined;
  const customScopeError =
    customScopeErrors.length > 0
      ? customScopeErrors[customScopeErrors.length - 1]
      : undefined;
  // Show overlay if there is any error
  const visible = !!error || !!customScopeError;
  const [popupLoading, setPopupLoading] = useState(false);
  const { instance, accounts } = useMsal();
  const account = accounts[0];
  const dispatch = useAppDispatch();

  const handlePopup = async () => {
    if (!instance || !account) return;
    setPopupLoading(true);
    try {
      if (errors) {
        await instance.acquireTokenPopup({ account, scopes: scopes });
        dispatch(clearErrors());
      } else if (customScopeErrors) {
        await instance.acquireTokenPopup({ account, scopes: customScopes });
        dispatch(clearCustomScopeErrors());
      }
      // Success: let the rest of the app handle state update
    } catch (e) {
      // Error: let the rest of the app handle error state
    } finally {
      setPopupLoading(false);
    }
  };

  if (!visible) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
    >
      {/* Translucent background layer to grey out UI */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          pointerEvents: "auto",
        }}
      />
      {/* Overlay content */}
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            background: tokens.colorNeutralBackground1,
            padding: 32,
            borderRadius: 12,
            boxShadow: "0 2px 8px #0003",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: tokens.colorBrandForeground1,
              marginBottom: 16,
            }}
          >
            Sign in Required
          </h2>
          <p
            style={{
              color: tokens.colorNeutralForeground2,
              marginBottom: 24,
            }}
          >
            To continue, please sign in with your Microsoft account.
          </p>
          <Button
            onClick={handlePopup}
            style={{ marginRight: 12 }}
            disabled={popupLoading}
          >
            {popupLoading ? "Opening..." : "Sign in"}
          </Button>
        </div>
      </div>
    </div>
  );
}
