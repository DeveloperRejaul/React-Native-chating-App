import {NativeBaseProvider} from 'native-base';
import React from 'react';
import Route from './src/navigation/route/Route.js';

function App() {
  return (
    <NativeBaseProvider>
      <Route />
    </NativeBaseProvider>
  );
}
export default App;
