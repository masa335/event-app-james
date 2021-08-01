/* eslint-disable react-hooks/exhaustive-deps */
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Flex, Heading, Link, Spacer } from "@chakra-ui/layout";
import { FormControl, HStack, Icon, Input } from "@chakra-ui/react";
import { memo, useCallback, VFC } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { useRecoilValue } from "recoil";
import { useSignout } from "../../../hooks/useSignout";
import { authState } from "../../../recoil/atoms/Auth";
import { MenuIconButton } from "../../atoms/button/MenuIconButton";
import { MenuDrawer } from "../../molecules/MenuDrawer";
import { GoSearch } from "react-icons/go"
import { useLocation } from "react-router-dom";

export const Header: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const history = useHistory();
  const { pathname } = useLocation(); //パスネームを取得
  const { signout } = useSignout();
  const { register, handleSubmit, getValues } = useForm({ mode: "all" });

  const auth = useRecoilValue(authState);
  const isSignedIn = auth.isSignedIn;
  const loading = auth.loading;
  const userId = auth.currentUser?.id;

  const isSearch = pathname.includes("/search");

  const onClickHome = useCallback(() => history.push("/"),[]);

  const onClickCreateEvent = useCallback(() => history.push("/create"),[]);

  const onClickUser = useCallback(() => history.push(`/user/${userId}`),[userId]);

  const onClickSettings = useCallback(() => history.push("/settings"),[]);

  const onClickLogin = useCallback(() => history.push("/login"),[]);

  const onClickSearch = () => history.push(`/search?keyword=${getValues("keyword")}`);

  type Params = {
    keyword: string;
  };

  const onSubmit = (params: Params) => {
    history.push(`/search?keyword=${params.keyword}`);
  };

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
            {!isSearch &&
              <Box pr={4}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <HStack spacing="10px" alignItems="center">
                    <Box>
                      <FormControl>
                        <Input 
                        id="keyword"
                        type="text"
                        width="200px"
                        height="30px"
                        color="black"
                        placeholder="イベント検索"
                        {...register("keyword",{ required: "キーワードは必須入力です" })}
                        border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
                      </FormControl>
                    </Box>
                    <Box>
                      <Link onClick={onClickSearch}>
                        <Icon as={GoSearch} />
                      </Link>
                    </Box>
                  </HStack>
                </form>
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