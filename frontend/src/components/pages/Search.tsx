import { memo, useCallback, useEffect, useState, VFC } from "react";
import { useForm } from "react-hook-form";
import { Button, FormControl, FormLabel, Input, Heading, Box, Wrap, WrapItem, HStack, useDisclosure } from "@chakra-ui/react"

import { EventCard } from "../organisms/event/eventCard";
import { useEvents } from "../../hooks/useEvents";
import { prefectures } from "../../data/prefectures";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useHistory, useLocation } from "react-router-dom";

export const Search: VFC = memo(() => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { searchEvent, events, loading } = useEvents();
  const [ isJoined, setIsJoined ] = useState(false); // 参加済みのイベントならtrue
  const [ isOrganizer, setIsOrganizer ] = useState(false); //イベント主催者ならtrue
  const { getCurrentUser, auth } = useCurrentUser();
  const { onSelectEvent, selectedEvent } = useSelectUser();
  const { search } = useLocation(); //クエリパラメータを取得
  const query = new URLSearchParams(search); //クエリパラメータを扱いやすい形に変換
  const { register, handleSubmit, setValue } = useForm({ mode: "all" });

  type Params = {
    keyword: string;
  };

  const onSubmit = (params: Params) => {
    history.push(`/search?keyword=${params.keyword}`)
  };

  useEffect(() => {
    setValue("keyword", query.get("keyword"));
    searchEvent({
      keyword: query.get("keyword")
    });
  },[search]);

  //モーダルを開閉するタイミングで実行
  useEffect(() => getCurrentUser,[isOpen])

  const onClickEvent = useCallback(
    (id: number | undefined, userId: number | undefined) => {
      //参加しているイベントIDとクリックしたイベントIDが一致する物が見つかったらtrueをセットする
      setIsJoined(!!auth.memberships?.find((event) => event.event_id === id));
      setIsOrganizer(!!auth.memberships?.find((event) => event.user_id === userId));
      onSelectEvent({ id, events, onOpen});
    },
    [onOpen, events, onSelectEvent, auth]
  );

  return (
    <>
    <Box my="20px" mx="20px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack spacing="24px" alignItems="flex-end">
          <Box>
            <FormControl>
              <FormLabel fontSize="md">キーワード</FormLabel>
              <Input 
              id="keyword"
              type="text"
              width="200px"
              placeholder="なんでも検索"
              {...register("keyword",{ required: "キーワードは必須入力です" })}
              border="1px" borderColor="gray.400" backgroundColor="gray.100"/>
            </FormControl>
          </Box>
          <Box>
            <Button type="submit" colorScheme="blue" disabled={loading} isLoading={loading}>イベント検索</Button>
          </Box>
        </HStack>
      </form>

    <Box my="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="md" color="white">検索結果</Heading>
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
            maxParticipants={event.max_participants}
            participantsCount={event.participants_count}
            onClick={onClickEvent}
          />
        </WrapItem>
      ))}
    </Wrap>
  </Box>
  <EventDetailModal event={selectedEvent} isOpen={isOpen} onClose={onClose} isJoined={isJoined} isOrganizer={isOrganizer} isSignedIn={auth.isSignedIn} loginUserId={auth.currentUser?.id}/>
  </>
  );
});