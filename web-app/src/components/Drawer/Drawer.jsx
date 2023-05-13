import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Text,
} from "@chakra-ui/react";
import Avatar from "../Avatar/Avatar";

export default function DrawerCom({ onClose, isOpen, size, userData }) {
  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color={"#537fe7"} />
        <DrawerBody mt={["20%"]}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Avatar image={userData.profilePicture} size={25} />
            <Text
              fontSize={"md"}
              fontWeight={"medium"}
              color={"blackAlpha.800"}
            >
              {userData.name}
            </Text>
            <Text
              fontSize={"sm"}
              fontWeight={"normal"}
              color={"blackAlpha.700"}
            >
              {userData.profession}
            </Text>
          </Box>
          <Box mt={"5%"}>
            <Text
              fontSize={"md"}
              fontWeight={"medium"}
              color={"blackAlpha.600"}
            >
              About
            </Text>
            <Text fontSize={"md"} fontWeight={"sm"} color={"blackAlpha.800"}>
              {userData.about}
            </Text>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
