import React, { useState, useRef, useEffect } from "react";
import { makeStyles, tokens } from "@fluentui/react-components";
import {
  LineHorizontal316Regular,
  SignOut24Regular,
} from "@fluentui/react-icons";
import { useUserPhoto } from "../../hooks/useUserPhoto";
import { useIdentity } from "../../hooks/useIdentity";
import { useMsal } from "@azure/msal-react";

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
    position: "relative",
  },
  avatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `2px solid ${tokens.colorBrandForeground1}`,
    background: tokens.colorNeutralBackground1,
    cursor: "pointer",
    ":hover": {
      borderColor: tokens.colorBrandForeground1,
    },
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
  dropdown: {
    position: "absolute",
    top: "100%",
    right: "0",
    marginTop: "4px",
    background: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "8px",
    boxShadow: `0 4px 12px ${tokens.colorNeutralShadowAmbient}`,
    minWidth: "200px",
    zIndex: 1000,
  },
  dropdownItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 16px",
    background: "none",
    border: "none",
    width: "100%",
    textAlign: "left",
    cursor: "pointer",
    color: tokens.colorNeutralForeground1,
    fontSize: "14px",
    ":hover": {
      background: tokens.colorNeutralBackground2,
    },
    ":first-child": {
      borderTopLeftRadius: "8px",
      borderTopRightRadius: "8px",
    },
    ":last-child": {
      borderBottomLeftRadius: "8px",
      borderBottomRightRadius: "8px",
    },
  },
  userInfo: {
    padding: "12px 16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground1,
  },
  userName: {
    fontWeight: 600,
    fontSize: "14px",
    marginBottom: "4px",
  },
  userEmail: {
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
});

export default function TopNav() {
  const styles = useStyles();
  const { user } = useIdentity();
  const { userPhoto } = useUserPhoto();
  const { instance } = useMsal();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showDropdown]);

  const handleAvatarClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSignOut = () => {
    setShowDropdown(false);
    instance.logout();
  };

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} aria-label="Open menu">
          <LineHorizontal316Regular />
        </button>
        <span className={styles.title}>Vibetato</span>
      </div>
      <div className={styles.right} ref={dropdownRef}>
        {userPhoto ? (
          <img
            src={userPhoto}
            alt={user.name}
            className={styles.avatar}
            onClick={handleAvatarClick}
          />
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
            onClick={handleAvatarClick}
          >
            {user.name ? user.name[0].toUpperCase() : "?"}
          </div>
        )}

        {showDropdown && (
          <div className={styles.dropdown}>
            <div className={styles.userInfo}>
              <div className={styles.userName}>
                {user.name || "Unknown User"}
              </div>
              <div className={styles.userEmail}>
                {user.username || "No email"}
              </div>
            </div>
            <button className={styles.dropdownItem} onClick={handleSignOut}>
              <SignOut24Regular />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
