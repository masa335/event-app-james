import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#e8ebe7",
        color: "gray.800"
      }
    }
  }
});

export default theme;