import React, { useState, useEffect } from "react";
import { tokens } from "@fluentui/react-theme";
import BottomNav from "../components/shell/BottomNav";
import TopNav from "../components/shell/TopNav";
import {
  PlanSection,
  ShopSection,
  CookSection,
  ChatSection,
} from "../components/sections";

const SECTION_KEYS = ["plan", "shop", "cook", "chat"] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

function isMobile() {
  if (typeof window !== "undefined") {
    return window.innerWidth < 900;
  }
  return false;
}

function isTablet() {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 900 && window.innerWidth < 1350;
  }
  return false;
}

function isLaptop() {
  if (typeof window !== "undefined") {
    return window.innerWidth >= 1350 && window.innerWidth < 1900;
  }
  return false;
}

function trimSections(
  sections: SectionKey[],
  max: number,
  keep?: SectionKey
): SectionKey[] {
  // Always add keep (if provided and not already present)
  let trimmed =
    keep && !sections.includes(keep) ? [...sections, keep] : [...sections];
  // Remove sections from the start of SECTION_KEYS order until only max remain
  for (const key of SECTION_KEYS) {
    if (trimmed.length <= max) break;
    if (trimmed.includes(key) && (!keep || key !== keep)) {
      trimmed = trimmed.filter((s) => s !== key);
    }
  }
  // If keep is provided and not present, ensure it's added
  if (keep && !trimmed.includes(keep)) {
    trimmed.push(keep);
    // Remove one more if over max
    if (trimmed.length > max) {
      for (const key of SECTION_KEYS) {
        if (trimmed.length <= max) break;
        if (trimmed.includes(key) && key !== keep) {
          trimmed = trimmed.filter((s) => s !== key);
        }
      }
    }
  }
  return trimmed;
}

export default function HomePage() {
  const [selectedSections, setSelectedSections] = useState<SectionKey[]>([
    "plan",
    "chat",
  ]);

  useEffect(() => {
    function handleResize() {
      if (isMobile() && selectedSections.length > 1) {
        setSelectedSections(trimSections(selectedSections, 1));
      } else if (isTablet() && selectedSections.length > 2) {
        setSelectedSections(trimSections(selectedSections, 2));
      } else if (isLaptop() && selectedSections.length > 3) {
        setSelectedSections(trimSections(selectedSections, 3));
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [selectedSections]);

  const handleSectionToggle = (section: SectionKey) => {
    if (isMobile()) {
      setSelectedSections((prev) =>
        prev.includes(section) ? [] : trimSections(prev, 1, section)
      );
    } else if (isTablet()) {
      setSelectedSections((prev) =>
        prev.includes(section)
          ? prev.filter((s) => s !== section)
          : trimSections(prev, 2, section)
      );
    } else if (isLaptop()) {
      setSelectedSections((prev) =>
        prev.includes(section)
          ? prev.filter((s) => s !== section)
          : trimSections(prev, 3, section)
      );
    } else {
      setSelectedSections((prev) =>
        prev.includes(section)
          ? prev.filter((s) => s !== section)
          : [...prev, section]
      );
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        background: tokens.colorBrandBackground,
      }}
    >
      <TopNav />
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "center",
        }}
      >
        {selectedSections.includes("plan") && <PlanSection />}
        {selectedSections.includes("shop") && <ShopSection />}
        {selectedSections.includes("cook") && <CookSection />}
        {selectedSections.includes("chat") && <ChatSection />}
      </main>
      <BottomNav
        onSectionSelect={handleSectionToggle}
        selectedSections={selectedSections}
      />
    </div>
  );
}
