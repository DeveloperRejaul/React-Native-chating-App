import Navigation from "./routes/Route";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { chatStore, persisStore } from "./redux/app/store";
import React from "react";
function App() {
  return (
    <Provider store={chatStore}>
      <PersistGate loading={null} persistor={persisStore}>
        <ChakraProvider>
          <Navigation />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
