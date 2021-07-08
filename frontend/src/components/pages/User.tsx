import { memo, useEffect, VFC } from "react";
import { Heading, Box, Image, Text, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";
import { useUser } from "../../hooks/useUser";
import { useParams } from "react-router-dom";

export const User: VFC = memo(() => {
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る
  const { getUserInfo, loading, userInfo } = useUser();

  //ユーザー情報を取得
  useEffect(() => getUserInfo(id),[]);
  

  return (
    <>
    <Box mx="40px" my="20px">
      <Box borderBottom="6px" borderStyle="double" borderColor="blackAlpha.400">
        <Image
            borderRadius="full"
            boxSize="160px"
            src="https://source.unsplash.com/random"
            alt={userInfo?.name}
            m="auto"
          />
        <Text fontSize="2xl" textAlign="center" color="gray.600">{userInfo?.name}</Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">{userInfo?.self_introduction}</Text>
      </Box>
      <Box my="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="md" color="white">イベント一覧</Heading>
      </Box>
      <Tabs size="sm" variant="enclosed" borderColor="gray.400">
        <TabList mb="1em">
          <Tab 
            _selected={{ color: "gray.600", bg: "white", shadow: "sm", borderColor: "gray.400", borderBottom: "none"}} 
            color="white"
            bg="gray.300" 
            borderBottomColor="gray.400"
          >
            主催したイベント
          </Tab>
          <Tab
            _selected={{ color: "gray.600", bg: "white", shadow: "sm", borderColor: "gray.400", borderBottom: "none"}} 
            color="white" 
            bg="gray.300" 
            borderBottomColor="gray.400"
          >
            参加するイベント
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>TODO:主催イベントを絞り込んで表示</p>
          </TabPanel>
          <TabPanel>
            <p>TODO:参加するイベントを絞り込んで表示</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    
    
    </>
  );
});