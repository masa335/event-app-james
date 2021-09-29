import { memo, useEffect, VFC } from "react";
import { Stack, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Button, Text, Icon, Link, Image, HStack } from "@chakra-ui/react";
import { Event } from "../../../types/event";
import { prefectures } from "../../../data/prefectures";
import { useMemberships } from "../../../hooks/useMemberships";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { BiUser } from "react-icons/bi"
import { EventCategoryList } from "../../../data/EventCategoryList";
import { useEvents } from "../../../hooks/useEvents";


type Props = {
  event: Event | null;
  isOpen: boolean;
  isJoined: boolean;
  isOrganizer: boolean;
  isSignedIn: boolean;
  onClose: () => void;
};

export const EventDetailModal: VFC<Props> = memo(props => {
  const { event, isOpen, onClose, isJoined, isOrganizer, isSignedIn } = props;
  const [ buttonSwitch, setButtonSwitch ] = useState<boolean>();
  const [ isFull, setIsFull ] = useState<boolean>(); //定員オーバかどうか
  const { createMemberships, deleteMemberships, loading } = useMemberships();
  const { getParticipants, participants} = useEvents();
  const history = useHistory();
  
  useEffect(() => {
    setButtonSwitch(isJoined);
    event?.id && getParticipants(`${event?.id}`);
    setIsFull(event?.max_participants === event?.participants_count);
  },[isOpen])

  const dateFormat = (date: Date | undefined) => {
    const formatDate = moment(date, moment.ISO_8601).format("yyyy/MM/DD HH:mm");
    return formatDate
  };

  const onClickJoin = () => {
    event?.id ? createMemberships(event?.id) : console.log("eventIdがありません");
    setButtonSwitch(true);
  };

  const onClickCancel = () => {
    event?.id ? deleteMemberships(event?.id) : console.log("eventIdがありません")
    setButtonSwitch(false);
  };
  
  const onClickEdit = () => {
    history.push(`/event/${event?.id}`)
  };

  const redirectToSignIn = () => {
    history.push("/login")
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>イベント詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            <FormControl>
              <Text>
                <Icon as={BiUser} />  
                <Link href={`/user/${event?.user_id}`} color="blue.400" ml={1}>{event?.organizer}</Link>
              </Text>
            </FormControl>
            <FormControl>
              <FormLabel>イベント名</FormLabel>
              <Input value={event?.event_name} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>カテゴリ</FormLabel>
              <Input value={event?.prefecture_id ? EventCategoryList[event?.event_category] : ""} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>開始日時</FormLabel>
              <Input value={dateFormat(event?.start_date)} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>終了日時</FormLabel>
              <Input value={dateFormat(event?.end_date)} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>開催する都道府県</FormLabel>
              <Input value={event?.prefecture_id ? prefectures[event?.prefecture_id] : ""} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>会場</FormLabel>
              <Input value={event?.venue} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>イベントの説明</FormLabel>
              <Textarea value={event?.explanation} isReadOnly={true}></Textarea>
            </FormControl>
            <Text>参加者</Text>
            <HStack>
            {participants?.map((participant) => (
              <Link href={`/user/${participant.id}`} key={participant.id}>
                <Image
                  borderRadius="full"
                  boxSize="30px"
                  src={participant.image.url  ?? "https://placehold.jp/150x150.png?text=no image"}
                  alt={participant.name}
                />
              </Link>
            ))}
            </HStack>
            {isSignedIn ? 
              ( isOrganizer ? 
                (<Button onClick={onClickEdit} colorScheme="teal" isLoading={loading}>編集する</Button>)
                :
                ( buttonSwitch ?
                  <Button onClick={onClickCancel} colorScheme="gray" isLoading={loading}>参加を取り消す</Button>
                  :
                  <Button onClick={onClickJoin} colorScheme="blue" isLoading={loading} disabled={isFull}>参加する</Button>
                )
              )
            : <Button onClick={redirectToSignIn} colorScheme="blue" isLoading={loading} disabled={isFull}>参加する</Button>
            }
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});