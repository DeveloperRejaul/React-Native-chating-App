import React from "react";
import "../../app.css";
import Profile from "../../assets/images/profile1.jpg";
import { IoSearch } from "react-icons/io5";
import Avatar from "../../components/Avatar/Avatar";
import usersData from "./users.data";
import { Box, Stack, Text, useDisclosure } from "@chakra-ui/react";
import {
  IoChatbubbleEllipsesOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { BiSearch } from "react-icons/bi";

import { headerHeight } from "./constences";
import DrawerCom from "../../components/Drawer/Drawer";
const isChat = true;

function MainPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div style={styles.container}>
      {/* All user Part */}
      <Box style={styles.chat} width={["100%", "100%", "30%"]}>
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
            <div key={ele.id} style={styles.userItem}>
              <Avatar image={Profile} isOnline={ele.isOnline} />
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

      {/* message part */}
      <Box style={styles.messages} display={["none", "none", "block"]}>
        {isChat ? (
          // Chat UI
          <Box width={"100"}>
            {/* Chat Header  */}
            <Box
              width={"100"}
              bg={"white"}
              height={headerHeight}
              display={["flex"]}
              alignItems={"center"}
              paddingX={"5"}
              borderBottom={"1px solid #ddd "}
              justifyContent={["space-between"]}
            >
              <Box
                cursor={"pointer"}
                display={["flex"]}
                onClick={() => onOpen()}
              >
                <Avatar image={Profile} />
                <Box ml={["2"]}>
                  <Text
                    fontSize={["md"]}
                    fontWeight={["medium"]}
                    color={["blackAlpha.600"]}
                  >
                    {"Rejaul Karim"}
                  </Text>
                  <Text
                    fontSize={["sm"]}
                    fontWeight={["medium"]}
                    color={["blackAlpha.500"]}
                  >
                    {"Chef Executive Officer"}
                  </Text>
                </Box>
              </Box>
              <Box display={"flex"}>
                <Box
                  ml={"3"}
                  padding={"1"}
                  borderRadius={"full"}
                  _hover={{ bg: "blackAlpha.300" }}
                  cursor={"pointer"}
                  transition={"ease-in-out .2s"}
                >
                  <BiSearch size={23} color={"black"} />
                </Box>
                <Box
                  _hover={{ bg: "blackAlpha.300" }}
                  cursor={"pointer"}
                  ml={"3"}
                  padding={"1"}
                  borderRadius={"full"}
                  transition={"ease-in-out .2s"}
                >
                  <IoEllipsisVertical size={23} color={"black"} />
                </Box>
              </Box>
              {/* Drawer  */}
              <DrawerCom isOpen={isOpen} onClose={onClose} size={"xs"} />
            </Box>

            {/* Chat Body  */}

            {/* Chat Footer */}
          </Box>
        ) : (
          // Is Not Chat UI
          <Box style={styles.notChat}>
            <Box
              padding={["4"]}
              border={"1px solid #ddd"}
              borderRadius={"full"}
              bg={["white"]}
              boxShadow={"md"}
              mb={["2"]}
            >
              <IoChatbubbleEllipsesOutline size={[50]} color={"#537fe7"} />
            </Box>
            <Text
              fontSize={["md"]}
              fontWeight={["medium"]}
              color={"black"}
              bg={"white"}
              paddingY={["1"]}
              paddingX={["3"]}
              borderRadius={["full"]}
              boxShadow={"md"}
            >
              Create Conversation
            </Text>
          </Box>
        )}
      </Box>
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
    backgroundColor: "#fff",
    borderRightWidth: "1px",
    borderRightColor: "#e5e7eb",
  },
  messages: {
    width: "70%",
    backgroundColor: "#f1f5f9",
  },
  notChat: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
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
  },
};
