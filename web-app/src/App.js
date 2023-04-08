import Navigation from "./routes/Route";
import { ChakraProvider } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider>
      <Navigation />
    </ChakraProvider>
  );
}

export default App;
