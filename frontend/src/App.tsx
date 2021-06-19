import React from 'react';
import { ChakraProvider, Flex, Heading } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"

import theme from "./theme/theme"
import { Router } from './router/router';


function App() {
  return (
    <ChakraProvider theme={theme}>
      {/* <Flex
        as="nav"
        bg="#76a1b8"
        color="white"
        align="center"
        justify="space-between"
        padding={{ base:3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            JAMES
          </Heading>
        </Flex>
      </Flex> */}
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
