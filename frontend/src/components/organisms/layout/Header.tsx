import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading, Link } from "@chakra-ui/layout";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();

  const onClickHome = useCallback(() => history.push("/"),[]);

  const onClickUser = useCallback(() => history.push("/user"),[]);

  const onClickLogin = useCallback(() => history.push("/login"),[]);
  
  return (
    <Flex
        as="nav"
        bg="#76a1b8"
        color="white"
        align="center"
        justify="space-between"
        padding={{ base:3, md: 5 }}
      >
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            JAMES
          </Heading>
        </Flex>
        <Flex
          align="center"
          fontSize="sm"
          display={{ base: "none", md: "flex" }}
          flexGrow={2}
        >
          <Box pr={4}>
            <Link onClick={onClickUser}>アカウント</Link>
          </Box>
          <Box pr={4}>
            <Link onClick={onClickLogin}>ログイン</Link>
          </Box>
        </Flex>
      </Flex>
  );
});