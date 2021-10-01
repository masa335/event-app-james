import { memo, useCallback, useEffect, useRef, useState, VFC } from "react";
import { Heading, Box, Image, Text, Tabs, TabList, Tab, TabPanels, TabPanel, Wrap, WrapItem, useDisclosure, Link, Flex, VStack, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Skeleton } from "@chakra-ui/react"
import { useParams } from "react-router-dom";

import { useUser } from "../../hooks/useUser";
import { EventCard } from "../organisms/event/eventCard";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { prefectures } from "../../data/prefectures";
import { useRelationships } from "../../hooks/useRelationships";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";

export const User: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る
  const auth = useRecoilValue(authState);
  const { getUserInfo, loading, userInfo, getFollowsFllowersCount, count, isFollowed, setIsFollowed } = useUser();
  const events = userInfo?.organized_events.concat(userInfo?.participating_events)!; //主催イベントと参加イベントをマージ
  const { onSelectEvent, selectedEvent } = useSelectUser();
  const [ isJoined, setIsJoined ] = useState(false); // 参加済みのイベントならtrue
  const [ isOrganizer, setIsOrganizer ] = useState(false); //イベント主催者ならtrue
  const { createRelationships, deleteRelationships } = useRelationships();
  const [ isOpenDialog, setIsOpenDialog ] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  
  //ユーザー情報を取得
  useEffect(() => {
    getUserInfo(id);
    getFollowsFllowersCount(id);
  },[getUserInfo,id,isFollowed]);

  const onClickEvent = useCallback(
    (id: number | undefined, userId: number | undefined) => {
      //参加しているイベントIDとクリックしたイベントIDが一致する物が見つかったらtrueをセットする
      setIsJoined(!!auth.memberships?.find((event) => event.event_id === id));
      setIsOrganizer(!!auth.memberships?.find((event) => event.user_id === userId));
      console.log(isOrganizer);
      onSelectEvent({ id, events, onOpen});
    },
    [onOpen, events, onSelectEvent, auth]
  );

  const onClickFollow = () => {
    createRelationships(id);
    setIsFollowed(true);
  };

  const onClickRemove = () => {
    deleteRelationships(id);
    setIsFollowed(false);
    setIsOpenDialog(false);
  };

  const onCloseDialog = () => setIsOpenDialog(false);

  const onOpenDialog = () => setIsOpenDialog(true);

  return (
    <>
    <Box mx="40px" my="20px">
      <Box pb="10px" borderBottom="6px" borderStyle="double" borderColor="blackAlpha.400">
        <VStack>
          {loading ? <Skeleton borderRadius="full" boxSize="160px"/> :
          <Image
              borderRadius="full"
              boxSize="160px"
              src={userInfo?.user.image.url ?? `${process.env.PUBLIC_URL}/default_icon.png`}
              alt={userInfo?.user.name}
            />
          }
          <Text fontSize="2xl" color="gray.600">{userInfo?.user.name}</Text>
          <Text fontSize="sm" textAlign="center" color="gray.600">{userInfo?.user.self_introduction}</Text>
          <Flex>
            <Text fontSize="lg" color="gray.600" mr="10px">フォロー中 <Link href={`/following/${id}`} fontWeight="bold">{count?.follows}</Link></Text>
            <Text fontSize="lg" color="gray.600">フォロワー <Link href={`/followers/${id}`} fontWeight="bold">{count?.followers}</Link></Text>
          </Flex>
          {
          Number(id) === auth.currentUser?.id ?
            ""
          :
            isFollowed ?
              <Button onClick={onOpenDialog} colorScheme="blue" isLoading={loading}>フォロー中</Button>
            :
              <Button onClick={onClickFollow} colorScheme="blue" variant="outline" isLoading={loading}>フォロー</Button>
          }
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
                  imageUrl={event.image.url ?? "https://placehold.jp/150x150.png?text=no image"}
                  eventName={event.event_name}
                  prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
                  maxParticipants={event.max_participants}
                  participantsCount={event.participants_count}
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
                  imageUrl={event.image.url ?? "https://placehold.jp/150x150.png?text=no image"}
                  eventName={event.event_name}
                  prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
                  maxParticipants={event.max_participants}
                  participantsCount={event.participants_count}
                  onClick={onClickEvent}
                />
              </WrapItem>
            ))}
          </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
    <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} isJoined={isJoined} isOrganizer={isOrganizer} isSignedIn={auth.isSignedIn}/>
    <AlertDialog isOpen={isOpenDialog} leastDestructiveRef={cancelRef} onClose={onCloseDialog}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            フォロー解除
          </AlertDialogHeader>

          <AlertDialogBody>
            {`${userInfo?.user.name}さんのフォローを解除します。\nよろしいですか？`}
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onCloseDialog}>
              キャンセル
            </Button>
            <Button colorScheme="red" onClick={onClickRemove} ml={3}>
              フォロー解除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
    </>
  );
});