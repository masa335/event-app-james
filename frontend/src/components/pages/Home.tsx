import { useEffect, useState } from "react";
import { memo, VFC } from "react";
import { useEvents } from "../../hooks/useEvents";

import { Wrap, WrapItem, Heading, useDisclosure, Box } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";
import { useCallback } from "react";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { prefectures } from "../../data/prefectures";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllEvents, events, loading } = useEvents();
  const { onSelectEvent, selectedEvent } = useSelectUser();
  const [ isJoined, setIsJoined ] = useState(false); // 参加済みのイベントならtrue
  const [ isOrganizer, setIsOrganizer ] = useState(false); //イベント主催者ならtrue
  const { getCurrentUser, auth } = useCurrentUser();

  //ページを開いた時にだけ実行する
  useEffect(() => getAllEvents(),[getAllEvents])

  //モーダルを開閉するタイミングで実行
  useEffect(() => getCurrentUser,[isOpen])

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

  return (
    <>
    <Box my="20px" mx="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="md" color="white">新着イベント</Heading>
    </Box>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
      {events.map((event) => (
        <WrapItem key={event.id}>
          <EventCard
            id={event.id}
            userId={event.user_id}
            imageUrl={event.image.url ?? "https://placehold.jp/150x150.png?text=no image"}
            eventName={event.event_name}
            prefecture={event.prefecture_id ? prefectures[event.prefecture_id] : ""}
            onClick={onClickEvent}
          />
        </WrapItem>
      ))}
    </Wrap>
    <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} isJoined={isJoined} isOrganizer={isOrganizer} isSignedIn={auth.isSignedIn}/>
    </>
  );
});