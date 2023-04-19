import React, { useState, useRef, useCallback } from "react";
import "../../app.css";
import Avatar from "../../components/Avatar/Avatar";
import {
  Box,
  Stack,
  Text,
  useDimensions,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IoChatbubbleEllipsesOutline,
  IoEllipsisVertical,
} from "react-icons/io5";
import { BiSearch } from "react-icons/bi";
import { headerHeight } from "./constences";
import DrawerCom from "../../components/Drawer/Drawer";
import SliderCom from "../../components/Slider/Slider";
import Users from "./Users";

function MainPage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const elementRef = useRef();
  const slider = useRef();

  const [isChat, setIsChat] = useState(false);
  const [chatUser, setChatUser] = useState({});
  const dimensions = useDimensions(elementRef, true);
  const displayCondition = isChat && dimensions?.contentBox.width < 765;

  const handleChat = useCallback((data) => {
    setIsChat(true);
    setChatUser({ ...data });
  }, []);

  const handleSlider = useCallback((data) => {
    slider.current = data;
  }, []);

  return (
    <div style={styles.container} ref={elementRef}>
      {/* All user Part */}
      <Users handleChat={handleChat} display={displayCondition && "none"} />

      {/* message part */}
      <Box
        display={["none", "none", "block"]}
        bg={"#f1f5f9"}
        style={{
          display: displayCondition && "block",
        }}
        width={displayCondition ? "100%" : "70%"}
      >
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
                <Avatar image={chatUser.profileImage} />
                <Box ml={["2"]}>
                  <Text
                    fontSize={["md"]}
                    fontWeight={["medium"]}
                    color={["blackAlpha.600"]}
                  >
                    {chatUser.name}
                  </Text>
                  <Text
                    fontSize={["sm"]}
                    fontWeight={["medium"]}
                    color={["blackAlpha.500"]}
                  >
                    {chatUser.profusion}
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
              <DrawerCom
                isOpen={isOpen}
                onClose={onClose}
                size={"xs"}
                userData={chatUser}
              />
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

      {displayCondition && (
        <SliderCom handleSlider={handleSlider}>
          <Users handleChat={handleChat} display={"block"} slider={slider} />
        </SliderCom>
      )}
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

  notChat: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    flexDirection: "column",
  },
};
