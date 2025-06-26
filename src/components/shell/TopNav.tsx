import React from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import { LineHorizontal316Regular } from "@fluentui/react-icons";
import { useUserPhoto } from "../../hooks/useUserPhoto";
import { useIdentity } from "../../hooks/useIdentity";

const useStyles = makeStyles({
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: tokens.colorNeutralBackground2,
    borderBottom: `1px solid ${tokens.colorBrandForeground1}`,
    height: "44px",
    padding: "0 1rem",
    position: "relative",
    zIndex: 10,
  },
  left: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  title: {
    color: tokens.colorNeutralForeground1,
    fontWeight: 700,
    fontSize: "1.1rem",
    marginLeft: "8px",
    letterSpacing: "0.5px",
  },
  right: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${tokens.colorBrandForeground1}`,
    background: tokens.colorNeutralBackground1,
  },
  menuBtn: {
    background: "none",
    border: "none",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    padding: 0,
    display: "flex",
    alignItems: "center",
    fontSize: "10px",
    outline: "none",
    transition: "color 0.2s",
    ":hover, :focus": {
      color: tokens.colorBrandForeground1,
    },
  },
});

export default function TopNav() {
  const styles = useStyles();
  const { user } = useIdentity();
  const { userPhoto } = useUserPhoto();

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} aria-label="Open menu">
          <LineHorizontal316Regular />
        </button>
        <span className={styles.title}>Vibetato</span>
      </div>
      <div className={styles.right}>
        {userPhoto ? (
          <img src={userPhoto} alt={user.name} className={styles.avatar} />
        ) : (
          <div
            className={styles.avatar}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 600,
              color: tokens.colorBrandForeground1,
              fontSize: "1.1rem",
            }}
          >
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>
        )}
      </div>
    </header>
  );
}
