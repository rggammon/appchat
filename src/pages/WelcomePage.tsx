import React from "react";
import MicrosoftLoginButton from "../components/MicrosoftLoginButton";
import { tokens } from "@fluentui/react-theme";

export default function WelcomePage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: tokens.colorBrandBackground,
      }}
    >
      <div style={{ fontSize: 80, marginBottom: 16 }} role="img" aria-label="potato">🥔</div>
      <h2 style={{ color: tokens.colorNeutralForeground1, marginBottom: 8 }}>Welcome to Vibetato!</h2>
      <p
        style={{
          fontSize: 20,
          color: tokens.colorNeutralForeground2,
          marginBottom: 24,
          maxWidth: 400,
          textAlign: "center",
        }}
      >
        Where every chat is a recipe and every friend is a chef!<br />
        Join our kitchen to mash up ideas, roast your worries, and cook up some fun.
      </p>
      <div style={{ fontSize: 32, marginBottom: 24 }} role="img" aria-label="cooking">🍳🥔🥄</div>
      <MicrosoftLoginButton />
      <p
        style={{
          marginTop: 32,
          color: tokens.colorBrandForeground1,
          fontStyle: "italic",
        }}
      >
        "The secret ingredient is always... potato!"
      </p>
    </div>
  );
}
