import { useEffect, useState } from "react";
import { memo, VFC } from "react";
import { useAllEvents } from "../../hooks/useAllEvents";

import { Wrap, WrapItem, Heading, useDisclosure } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";
import { useCallback } from "react";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { useCurrentUser } from "../../hooks/useCurrentUser";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getEvents, events, loading } = useAllEvents();
  const { onSelectEvent, selectedEvent } = useSelectUser();
  const [ isJoined, setIsJoined ] = useState(false); // 参加済みのイベントならtrue
  const [ isOrganizer, setIsOrganizer ] = useState(false); //イベント主催者ならtrue
  const { getCurrentUser, auth } = useCurrentUser();

  //ページを開いた時にだけ実行する
  useEffect(() => getEvents(),[getEvents])

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
    <Heading as="h3" size="lg" pl="30px">新着イベント</Heading>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
      {events.map((event) => (
        <WrapItem key={event.id}>
          <EventCard
            id={event.id}
            userId={event.user_id}
            imageUrl="https://source.unsplash.com/random"
            eventName={event.event_name}
            prefecture="三重県"
            onClick={onClickEvent}
          />
        </WrapItem>
      ))}
    </Wrap>
    <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} isJoined={isJoined} isOrganizer={isOrganizer}/>
    </>
  );
});