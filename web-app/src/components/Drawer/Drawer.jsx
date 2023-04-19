import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

export default function DrawerCom({ onClose, isOpen, size }) {
  //   const sizes = ["xs", "sm", "md", "lg", "xl", "full"];

  return (
    <Drawer onClose={onClose} isOpen={isOpen} size={size}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerCloseButton color={"#537fe7"} />
        <DrawerHeader>{` drawer contents`}</DrawerHeader>
        <DrawerBody>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Consequat nisl vel pretium lectus quam id. Semper quis lectus nulla
            at volutpat diam ut venenatis. Dolor morbi non arcu risus quis
            varius quam quisque. Massa ultricies mi quis hendrerit dolor magna
            eget est lorem. Erat imperdiet sed euismod nisi porta. Lectus
            vestibulum mattis ullamcorper velit.
          </p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
