/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import { memo, useCallback, VFC } from "react";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { useSignout } from "../../../hooks/useSignout";
import { authState } from "../../../recoil/atoms/Auth";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { signout } = useSignout();

  const auth = useRecoilValue(authState);
  const isSignedIn = auth.isSignedIn;
  const loading = auth.loading;
  const userId = auth.currentUser?.id;

  const onClickHome = useCallback(() => history.push("/"),[]);

  const onClickCreateEvent = useCallback(() => history.push("/create"),[]);

  const onClickUser = useCallback(() => history.push(`/user/${userId}`),[userId]);

  const onClickSettings = useCallback(() => history.push("/settings"),[]);

  const onClickLogin = useCallback(() => history.push("/login"),[]);

  return (
    <>
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
            {!loading && isSignedIn &&
              <Box pr={4}>
                <Link onClick={onClickCreateEvent}>イベント作成</Link>
              </Box>
            }
            {!loading && isSignedIn &&
              <Box pr={4}>
                <Link onClick={onClickUser}>アカウント</Link>
              </Box>
            }
            {!loading && isSignedIn &&
              <Box pr={4}>
                <Link onClick={onClickSettings}>設定</Link>
              </Box>
            }
            <Spacer />
            <Box pr={4}>
              {!loading && (isSignedIn ? (
                <Link onClick={signout}>ログアウト</Link>
              ) : (
                <Link onClick={onClickLogin}>ログイン</Link>
              ))}
            </Box>
          </Flex>
          <MenuIconButton onOpen={onOpen}/>
        </Flex>
        <MenuDrawer 
          isOpen={isOpen}
          isSignedIn={isSignedIn} 
          onClose={onClose} 
          onClickUser={onClickUser} 
          onClickLogin={onClickLogin}
          onClickLogout={signout}
          onClickCreateEvent={onClickCreateEvent}
          onClickSettings={onClickSettings}
        />
      </>
  );
});