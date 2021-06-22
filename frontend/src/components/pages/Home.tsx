import { useEffect } from "react";
import { memo, VFC } from "react";
import { useAllEvents } from "../../hooks/useAllEvents";

import { Wrap, WrapItem, Heading } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";

export const Home: VFC = memo(() => {
  const {getEvents, events, loading} = useAllEvents();

  //ページを開いた時にだけ実行する
  useEffect(() => getEvents(),[])

  return (
    <>
    <Heading as="h3" size="lg" pl="30px">新着イベント</Heading>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px">
      {events.map((event) => (
        <WrapItem>
          <EventCard
            imageUrl="https://source.unsplash.com/random"
            eventName={event.event_name}
            prefecture="三重県"
          />
        </WrapItem>
      ))}
    </Wrap>
    </>
  );
});