import { memo, useCallback, useEffect, VFC } from "react";
import { Heading, Box, Image, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Wrap, WrapItem, useDisclosure, Link, Flex, VStack, Button } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

import { useUser } from "../../hooks/useUser";
import { EventCard } from "../organisms/event/eventCard";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { prefectures } from "../../data/prefectures";

export const User: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る
  const { getUserInfo, loading, userInfo, getFollowsFllowersCount, count } = useUser();
  const events = userInfo?.organized_events.concat(userInfo?.participating_events)!; //主催イベントと参加イベントをマージ
  const { onSelectEvent, selectedEvent } = useSelectUser();

  //ユーザー情報を取得
  useEffect(() => {
    getUserInfo(id);
    getFollowsFllowersCount(id);
  },[getUserInfo,id]);

  const onClickEvent = useCallback(
    (id: number | undefined) => {
      onSelectEvent({ id, events, onOpen});
    },
    [onOpen, events, onSelectEvent]
  );

  return (
    <>
    <Box mx="40px" my="20px">
      <Box pb="10px" borderBottom="6px" borderStyle="double" borderColor="blackAlpha.400">
        <VStack>
          <Image
              borderRadius="full"
              boxSize="160px"
              src={userInfo?.user.image.url}
              alt={userInfo?.user.name}
            />
          <Text fontSize="2xl" color="gray.600">{userInfo?.user.name}</Text>
          <Text fontSize="sm" textAlign="center" color="gray.600">{userInfo?.user.self_introduction}</Text>
          <Flex>
            <Text fontSize="lg" color="gray.600" mr="10px">フォロー中 <Link href={`/following/${id}`} fontWeight="bold">{count?.follows}</Link></Text>
            <Text fontSize="lg" color="gray.600">フォロワー <Link href={`/followers/${id}`} fontWeight="bold">{count?.followers}</Link></Text>
          </Flex>
          <Button colorScheme="blue" isLoading={loading}>フォロー</Button>
        </VStack>
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
          <Wrap pr={{ base:4, md: 1 }} pl={{ base:4, md: 0 }} pb={{ base:4, md: 8 }} pt="5px">
            {userInfo?.organized_events.map((event) => (
              <WrapItem key={event.id}>
                <EventCard
                  id={event.id}
                  userId={event.user_id}
                  imageUrl={event.image.url ?? "https://source.unsplash.com/random"}
                  eventName={event.event_name}
                  prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
                  onClick={onClickEvent}
                />
              </WrapItem>
            ))}
          </Wrap>
          </TabPanel>
          <TabPanel>
          <Wrap pr={{ base:4, md: 1 }} pl={{ base:4, md: 0 }} pb={{ base:4, md: 8 }} pt="5px">
            {userInfo?.participating_events.map((event) => (
              <WrapItem key={event.id}>
                <EventCard
                  id={event.id}
                  userId={event.user_id}
                  imageUrl={event.image.url ?? "https://source.unsplash.com/random"}
                  eventName={event.event_name}
                  prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
                  onClick={onClickEvent}
                />
              </WrapItem>
            ))}
          </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} isJoined={true} isOrganizer={true} isSignedIn={true}/>
    </>
  );
});