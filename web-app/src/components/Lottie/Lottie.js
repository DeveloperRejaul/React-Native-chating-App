import React from "react";
import Lottie from "lottie-react";
import { Stack } from "@chakra-ui/react";

function LottieCom({ animation, width, height }) {
  return (
    <Stack width={width ? width : 100} height={height ? height : 70}>
      <Lottie animationData={animation} />
    </Stack>
  );
}

export default LottieCom;
