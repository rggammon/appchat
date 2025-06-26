import React from "react";
import { tokens } from "@fluentui/react-theme";
import { useSectionStyles } from "./SectionStyles";
import ChatControl from "../controls/ChatControl";

export default function ChatSection() {
  const styles = useSectionStyles();
  return (
    <section className={styles.section}>
      <ChatControl />
    </section>
  );
}
