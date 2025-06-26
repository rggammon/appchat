import React from "react";
import { tokens } from "@fluentui/react-theme";
import { useSectionStyles } from "./SectionStyles";

export default function CookSection() {
  const styles = useSectionStyles();
  return (
    <section className={styles.section}>
      <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: 8 }}>
        Cook
      </h3>
      {/* Add cook content here */}
    </section>
  );
}
