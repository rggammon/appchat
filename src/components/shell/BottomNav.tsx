import React from "react";
import { makeStyles, shorthands, tokens } from "@fluentui/react-components";
import {
  CalendarLtr24Regular,
  Cart24Regular,
  BowlChopsticks24Regular,
  Chat24Regular,
} from "@fluentui/react-icons";

const useStyles = makeStyles({
  nav: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    height: "64px",
    background: tokens.colorNeutralBackground2,
    borderTop: `1px solid ${tokens.colorBrandForeground1}`,
    ...shorthands.padding("0", "0"),
    // Removed position: fixed, bottom, left, width, zIndex to allow flexbox layout
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
  selected: {
    color: tokens.colorBrandForeground1,
    fontWeight: 700,
  },
});

const navItems = [
  { label: "Plan", icon: <CalendarLtr24Regular />, key: "plan" },
  { label: "Shop", icon: <Cart24Regular />, key: "shop" },
  { label: "Cook", icon: <BowlChopsticks24Regular />, key: "cook" },
  { label: "Chat", icon: <Chat24Regular />, key: "chat" },
];

type SectionKey = "plan" | "shop" | "cook" | "chat";

interface BottomNavProps {
  onSectionSelect?: (section: SectionKey) => void;
  selectedSections?: SectionKey[];
}

export default function BottomNav({
  onSectionSelect,
  selectedSections = [],
}: BottomNavProps) {
  const styles = useStyles();
  return (
    <nav className={styles.nav} aria-label="Bottom navigation">
      {navItems.map((item) => {
        const isSelected = selectedSections.includes(item.key as SectionKey);
        return (
          <button
            key={item.label}
            className={styles.button}
            onClick={() => onSectionSelect?.(item.key as SectionKey)}
            aria-label={item.label}
            aria-pressed={isSelected}
          >
            <span className={isSelected ? styles.selected : undefined}>
              {item.icon}
            </span>
            <span className={isSelected ? styles.selected : styles.label}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
