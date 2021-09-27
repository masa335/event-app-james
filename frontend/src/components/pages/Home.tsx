import { useEffect, useState } from "react";
import { memo, VFC } from "react";
import { useEvents } from "../../hooks/useEvents";

import { Wrap, WrapItem, Heading, useDisclosure, Box, Image, Button, Text, Stack } from "@chakra-ui/react";
import { EventCard } from "../organisms/event/eventCard";
import { useCallback } from "react";
import { EventDetailModal } from "../organisms/event/EventDetailModal";
import { useSelectUser } from "../../hooks/useSelectEvent";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { prefectures } from "../../data/prefectures";
import { useHistory } from "react-router-dom";
import { useSignin } from "../../hooks/useSignin";
import { GuestUserInfo } from "../../data/GuestUserInfo";

export const Home: VFC = memo(() => {
  const history = useHistory();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getAllEvents, events, loading } = useEvents();
  const { onSelectEvent, selectedEvent } = useSelectUser();
  const [ isJoined, setIsJoined ] = useState(false); // 参加済みのイベントならtrue
  const [ isOrganizer, setIsOrganizer ] = useState(false); //イベント主催者ならtrue
  const { getCurrentUser, auth } = useCurrentUser();
  const { signin } = useSignin();

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

  const onClickStart = () => {
    history.push("/signup")
  };

  const onClickGuestLogin = () => {
    const params = GuestUserInfo;
    signin(params);
  };

  return (
    <>
    {console.log(`${auth.isSignedIn}0927`)}
    {!auth.isSignedIn && !loading &&
    <Box>
      <Box my="20px" mx="20px" p={1} textAlign="center" borderRadius="lg">
        <Heading mb={2} as="h2" size="lg">
          仕事で忙しくても、バンドやセッションがしたい人たちを繋ぎます！
        </Heading>
        <Wrap pr={{ base:4, md: 8 }} pl={{ base:4, md: 8 }} pb={{ base:4, md: 8 }} pt="5px" justify="space-around">
          <Box w="xs" p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" bg="#F6E5CC">
            <Heading mb={2} as="h2" size="md" color="black">週末バンドを楽しみたい！</Heading>
            <Image w="xs" h="240px" src={`${process.env.PUBLIC_URL}/band.jpg`} />
            <Box p="4">
              <Box>
                平日はガッツリ仕事して、週末は趣味でバンドがしたいという時に、
                メンバー探しに一苦労…。JAMESで素敵な週末バンドメンバーを探そう！
              </Box>
            </Box>
          </Box>
          <Box w="xs" p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" bg="#F6E5CC">
            <Heading mb={2} as="h2" size="md" color="black">仕事終わりにセッション！</Heading>
            <Image w="xs" h="240px" src={`${process.env.PUBLIC_URL}/session.jpg`} />
            <Box p="4">
              <Box>
                仕事終わりに会社近くのスタジオでセッションしたい時の仲間探しに！
                仕事以外の時間もJAMESで充実させよう！
              </Box>
            </Box>
          </Box>
          <Box w="xs" p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" bg="#F6E5CC">
            <Heading mb={2} as="h2" size="md" color="black">練習相手を探したい！</Heading>
            <Image w="xs" h="240px" src={`${process.env.PUBLIC_URL}/practice.jpg`} />
            <Box p="4">
              <Box>
                一人で楽器の練習をしているけど、モチベーションが続かない・・・。
                たまには誰かと練習したくないですか？
                JAMESで素敵な練習相手を見つけよう！
              </Box>
            </Box>
          </Box>
        </Wrap>
      </Box>
      <Stack mx={{base:10, md:100}} p={5} bg="white" shadow="md" borderRadius="lg" spacing={{base:10, md:150}} justify="center" direction={{base:"column", md:"row"}}>
        <Box textAlign="center">
          <Button mb={1} colorScheme="blue" shadow="lg" onClick={onClickStart}>いますぐスタート！</Button>
          <Text fontSize="sm">新規登録を行います</Text>
        </Box>
        <Box textAlign="center">
          <Button mb={1} colorScheme="teal" shadow="lg" onClick={onClickGuestLogin}>ちょっと使ってみる！</Button>
          <Text fontSize="sm">ゲストユーザーでログインします</Text>
        </Box>
      </Stack>
    </Box>
    }
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