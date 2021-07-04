import React from 'react';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import theme from "./theme/theme"
import { Router } from './router/router';

function App() {

  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
