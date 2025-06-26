import React from "react";
import { tokens } from "@fluentui/react-theme";
import { useSectionStyles } from "./SectionStyles";

export default function ShopSection() {
  const styles = useSectionStyles();
  return (
    <section className={styles.section}>
      <h3 style={{ color: tokens.colorBrandForeground1, marginBottom: 8 }}>
        Shop
      </h3>
      {/* Add shop content here */}
    </section>
  );
}
