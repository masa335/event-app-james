import { useEffect } from "react";
import { memo, VFC } from "react";
import { useAllEvents } from "../../hooks/useAllEvents";

import { Wrap, WrapItem, Heading, useDisclosure } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";
import { useCallback } from "react";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";

export const Home: VFC = memo(() => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getEvents, events, loading } = useAllEvents();
  const { onSelectEvent, selectedEvent } = useSelectUser();

  //ページを開いた時にだけ実行する
  useEffect(() => getEvents(undefined),[getEvents])

  const onClickEvent = useCallback(
    (id: number | undefined) => {
      onSelectEvent({ id, events, onOpen});
    },
    [onOpen, events, onSelectEvent]
  );

  return (
    <>
    <Heading as="h3" size="lg" pl="30px">新着イベント</Heading>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
      {events.map((event) => (
        <WrapItem key={event.id}>
          <EventCard
            id={event.id}
            imageUrl="https://source.unsplash.com/random"
            eventName={event.event_name}
            prefecture="三重県"
            onClick={onClickEvent}
          />
        </WrapItem>
      ))}
    </Wrap>
    <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose}/>
    </>
  );
});