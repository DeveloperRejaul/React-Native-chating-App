import React from "react";
import { headerHeight } from "../../pages/main-pages/constences";

const Avatar = ({ image, isOnline, size = 1 }) => {
  const styles = {
    profile: {
      position: "relative",
      width: headerHeight + size - 18,
      height: headerHeight + size - 18,
    },
    activeStatus: {
      position: "absolute",
      width: "10px",
      height: "10px",
      borderRadius: "5px",
      backgroundColor: "#4ade80",
      zIndex: 2,
      left: 5,
    },
    profileAvatar: {
      width: headerHeight + size - 18,
      height: headerHeight + size - 18,
      borderRadius: headerHeight + size - 18 / 2,
      overflow: "hidden",
    },
    profileImage: { width: "100%", height: "100%" },
  };

  return (
    <div style={styles.profile}>
      <div style={isOnline ? styles.activeStatus : null} />
      <div style={styles.profileAvatar}>
        <img style={styles.profileImage} src={image} alt="Profile" />
      </div>
    </div>
  );
};

export default Avatar;
