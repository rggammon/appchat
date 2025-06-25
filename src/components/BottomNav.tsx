import React from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import { CalendarLtr24Regular, Cart24Regular, BowlChopsticks24Regular, Chat24Regular } from "@fluentui/react-icons";

const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "64px",
    background: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorBrandForeground1}`,
    ...shorthands.padding("0", "0"),
    position: "fixed",
    bottom: 0,
    left: 0,
    width: "100%",
    zIndex: 100,
  },
  button: {
    background: "none",
    border: "none",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    fontSize: "12px",
    cursor: "pointer",
    flex: 1,
    padding: 0,
    outline: "none",
    transition: "color 0.2s",
    ":hover, :focus": {
      color: tokens.colorBrandForeground1,
    },
  },
  label: {
    marginTop: "2px",
  },
});

const navItems = [
  { label: "Plan", icon: <CalendarLtr24Regular />, to: "/plan" },
  { label: "Shop", icon: <Cart24Regular />, to: "/shop" },
  { label: "Cook", icon: <BowlChopsticks24Regular />, to: "/cook" },
  { label: "Chat", icon: <Chat24Regular />, to: "/" },
];

export default function BottomNav() {
  const styles = useStyles();
  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      {navItems.map(item => (
        <button
          key={item.label}
          className={styles.button}
          onClick={() => (window.location.pathname = item.to)}
          aria-label={item.label}
        >
          {item.icon}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
