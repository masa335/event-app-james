import { useEffect } from "react";
import { memo, VFC } from "react";
import { useAllEvents } from "../../hooks/useAllEvents";

import { Wrap, WrapItem, Heading } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";

export const Home: VFC = memo(() => {
  const {getEvents, events, loading} = useAllEvents();
  const auth = useRecoilValue(authState);
  console.log(auth.currentUser?.name);
  console.log(auth.isSignedIn);

  //ページを開いた時にだけ実行する
  useEffect(() => getEvents(undefined),[getEvents])

  return (
    <>
    <Heading as="h3" size="lg" pl="30px">新着イベント</Heading>
    <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
      {events.map((event) => (
        <WrapItem key={event.id}>
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