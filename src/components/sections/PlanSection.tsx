import React from "react";
import { tokens } from "@fluentui/react-theme";
import { useSectionStyles } from "./SectionStyles";

export default function PlanSection() {
  const styles = useSectionStyles();
  return (
    <section className={styles.section}>
      <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: 8 }}>
        Plan
      </h3>
      {/* Add plan content here */}
    </section>
  );
}
