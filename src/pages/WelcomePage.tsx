import React from "react";
import MicrosoftLoginButton from "../components/MicrosoftLoginButton";

export default function WelcomePage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "100vh", background: "#fffbe6" }}>
      <div style={{ fontSize: 80, marginBottom: 16 }} role="img" aria-label="potato">🥔</div>
      <h2 style={{ color: "#a0522d", marginBottom: 8 }}>Welcome to Vibetato!</h2>
      <p style={{ fontSize: 20, color: "#7c4700", marginBottom: 24, maxWidth: 400, textAlign: "center" }}>
        Where every chat is a recipe and every friend is a chef!<br />
        Join our kitchen to mash up ideas, roast your worries, and cook up some fun.
      </p>
      <div style={{ fontSize: 32, marginBottom: 24 }} role="img" aria-label="cooking">🍳🥔🥄</div>
      <MicrosoftLoginButton />
      <p style={{ marginTop: 32, color: "#b8860b", fontStyle: "italic" }}>
        "The secret ingredient is always... potato!"
      </p>
    </div>
  );
}
