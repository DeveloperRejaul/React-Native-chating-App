import { Box, Slide, useDisclosure } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { IoCaretForwardOutline, IoCaretBackOutline } from "react-icons/io5";

export default function SliderCom({ children, handleSlider = () => {} }) {
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    handleSlider(onToggle);
  });

  return (
    <>
      <Box
        onClick={onToggle}
        position={"absolute"}
        left={"2"}
        top={"50%"}
        zIndex={isOpen ? 1 : 20}
        animation={"1s ease-in-out"}
        bg={"white"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        boxShadow={"md"}
      >
        <IoCaretForwardOutline size={40} />
      </Box>
      <Slide direction="left" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          onClick={onToggle}
          textAlign={"right"}
          position={"absolute"}
          right={"0"}
          top={"50%"}
          bg={"white"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          boxShadow={"md"}
          zIndex={isOpen ? 20 : 1}
        >
          <IoCaretBackOutline size={40} />
        </Box>

        {/* Uses Component */}
        {children}
      </Slide>
    </>
  );
}
