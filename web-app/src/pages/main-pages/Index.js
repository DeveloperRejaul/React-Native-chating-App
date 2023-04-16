import React, { useState } from "react";
import "../../app.css";
import Profile from "../../assets/images/profile1.jpg";
import { IoSearch } from "react-icons/io5";
const headerHeight = 60;

function MainPage() {
  return (
    <div style={styles.container}>
      <div style={styles.chat}>
        <div style={styles.header}>
          <div style={styles.profile}>
            <div style={styles.activeStatus} />
            <div style={styles.profileAvatar}>
              <img style={styles.profileImage} src={Profile} alt="Profile" />
            </div>
          </div>
          <div className="main-search-bar">
            <IoSearch size={28} color={"gray"} />
            <input
              style={styles.searchInput}
              type="text"
              name="search"
              id="main-search"
              placeholder="Search"
            />
          </div>
        </div>

        <div className="chat-body"></div>
        <div className="chat-footer"></div>
      </div>
      <div style={styles.user}></div>
    </div>
  );
}
export default MainPage;

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#ffffff",
    height: "100vh",
  },
  chat: {
    width: "30%",
    backgroundColor: "#fff",
    borderRightWidth: "1px",
    borderRightColor: "#e5e7eb",
  },
  user: {
    width: "70%",
    backgroundColor: "#f1f5f9",
  },
  header: {
    height: headerHeight,
    borderBottomColor: "#e5e7eb",
    borderBottomWidth: "1px",
    display: "flex",
    alignItems: "center",
    paddingRight: 20,
    paddingLeft: 20,
    justifyContent: "space-between",
  },
  profileAvatar: {
    width: headerHeight - 10,
    height: headerHeight - 10,
    borderRadius: headerHeight - 10 / 2,
    overflow: "hidden",
  },
  profileImage: { width: "100%", height: "100%" },

  profile: {
    position: "relative",
    width: headerHeight - 10,
    height: headerHeight - 10,
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
  searchInput: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
};
