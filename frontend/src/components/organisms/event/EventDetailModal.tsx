import { memo, useEffect, VFC } from "react";
import { Stack, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Button } from "@chakra-ui/react";
import { Event } from "../../../types/event";
import { prefectures } from "../../../data/prefectures";
import { useMemberships } from "../../../hooks/useMemberships";
import { useState } from "react";
import { useHistory } from "react-router-dom";


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
  const { createMemberships, deleteMemberships, loading } = useMemberships();
  const history = useHistory();
  
  useEffect(() => setButtonSwitch(isJoined),[isOpen])

  const onClickJoin = () => {
    event?.id ? createMemberships(event?.id) : console.log("eventIdがありません");
    setButtonSwitch(true);
  }

  const onClickCancel = () => {
    event?.id ? deleteMemberships(event?.id) : console.log("eventIdがありません")
    setButtonSwitch(false);
  }

  const redirectToSignIn = () => {
    history.push("/login")
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" autoFocus={false} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader>イベント詳細</ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>イベント名</FormLabel>
              <Input value={event?.event_name} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>カテゴリ</FormLabel>
              <Input value={event?.event_category} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>開始日時</FormLabel>
              <Input value={String(event?.start_date)} isReadOnly={true}></Input>
            </FormControl>
            <FormControl>
              <FormLabel>終了日時</FormLabel>
              <Input value={String(event?.end_date)} isReadOnly={true}></Input>
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
            {isSignedIn ? 
              ( !isOrganizer && 
                ( buttonSwitch ?
                  <Button onClick={onClickCancel} colorScheme="red" isLoading={loading}>参加を取り消す</Button>
                  :
                  <Button onClick={onClickJoin} colorScheme="blue" isLoading={loading}>参加する</Button>
                )
              )
            : <Button onClick={redirectToSignIn} colorScheme="blue" isLoading={loading}>参加する</Button>
            }
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});