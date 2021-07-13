import React, { memo, useEffect, VFC } from 'react';
import { RecoilRoot } from 'recoil';
import { ChakraProvider } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import theme from "./theme/theme"
import { Router } from './router/router';
import { useCurrentUser } from './hooks/useCurrentUser';

export const AppInit: VFC = memo(() => {
  console.log("hello");
  const { getCurrentUser } = useCurrentUser();
  useEffect(() => getCurrentUser(), []);
  return null;
});

function App() {

  return (
    <RecoilRoot>
      <AppInit />
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  );
}

export default App;
