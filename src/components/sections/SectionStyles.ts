import { makeStyles, tokens } from "@fluentui/react-components";

export const useSectionStyles = makeStyles({
  section: {
    flex: 1,
    background: tokens.colorNeutralBackground1,
    margin: "8px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "450px",
  },
});
