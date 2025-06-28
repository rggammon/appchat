import React from "react";
import { tokens } from "@fluentui/react-theme";
import { useSectionStyles } from "./SectionStyles";
import { useRecipe } from "../../hooks/useRecipe";
import { useApiConfig } from "../../context/ApiConfigContext";

export default function CookSection() {
  const styles = useSectionStyles();
  const { apiScope } = useApiConfig();
  const { description, loading, error } = useRecipe("0", apiScope);

  return (
    <section className={styles.section}>
      {loading && (
        <div style={{ color: tokens.colorNeutralForeground2 }}>
          Loading recipe...
        </div>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <div style={{ color: tokens.colorNeutralForeground2 }}>
          Name: {description.name}
        </div>
      )}
    </section>
  );
}
