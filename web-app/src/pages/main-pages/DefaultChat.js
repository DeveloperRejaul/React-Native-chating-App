import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";

function DefaultChat() {
  return (
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
  );
}

export default DefaultChat;

const styles = {
  notChat: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
};
