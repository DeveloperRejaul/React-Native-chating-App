import { Box, Stack, Text } from "@chakra-ui/react";
import React from "react";
import Avatar from "../../components/Avatar/Avatar";
import { IoSearch } from "react-icons/io5";
import usersData from "./users.data";
import { headerHeight } from "./constences";
import Profile from "../../assets/images/profile1.jpg";
import "../../app.css";

function Users({ handleChat, display, slider }) {
  const handleClick = (data) => {
    handleChat(data);
    if (slider != undefined) {
      slider.current();
    }
  };

  return (
    <Box
      width={["100%", "100%", "30%"]}
      style={{
        ...styles.chat,
        display: display,
      }}
    >
      {/* User Header */}
      <div style={styles.header}>
        <Avatar isOnline image={Profile} />
        <div className="main-search-bar">
          <IoSearch size={28} color={"gray"} />
          <input
            style={styles.searchInput}
            type="text"
            name="search"
            id="main-search"
            placeholder="Search.."
          />
        </div>
      </div>
      {/* chat Body */}
      <div style={styles.chatBody} className="chat-body">
        {usersData.map((ele) => (
          <div
            key={ele.id}
            style={styles.userItem}
            onClick={() => handleClick(ele)}
          >
            <Avatar image={ele.profileImage} isOnline={ele.isOnline} />
            <div>
              <Text
                marginLeft={["2"]}
                color={"black"}
                fontSize={["md"]}
                fontWeight={["medium"]}
              >
                {ele.name}
              </Text>
              <Text
                marginLeft={["2"]}
                color={"black"}
                fontSize={["sm"]}
                fontWeight={["normal"]}
              >
                {ele.messages[ele.messages.length - 1]}
              </Text>
            </div>
          </div>
        ))}
      </div>
      {/* User Footer */}
      <Stack borderTop={["1px solid #ddd"]}>
        <Text
          textAlign={"center"}
          color={["blackAlpha.600"]}
          fontWeight={"normal"}
          mt={["2"]}
        >
          End-to-end encrypted
        </Text>
      </Stack>
    </Box>
  );
}

export default Users;

const styles = {
  chat: {
    backgroundColor: "#fff",
    borderRightWidth: "1px",
    borderRightColor: "#e5e7eb",
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
  searchInput: {
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: 20,
    fontWeight: "500",
    color: "#000",
  },
  chatBody: {
    height: "82vh",
    overflowX: "hidden",
    overflowY: "scroll",
    padding: 20,
  },
  userItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    cursor: "pointer",
  },
};
