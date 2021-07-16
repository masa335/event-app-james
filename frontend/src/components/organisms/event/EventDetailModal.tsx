import { memo, VFC } from "react";
import { Box, Icon, Image, Stack, Text, HStack, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md"
import { Event } from "../../../types/event";
import { prefectures } from "../../../data/prefectures";

type Props = {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
};

export const EventDetailModal: VFC<Props> = memo(props => {
  const { event, isOpen, onClose } = props;

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
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});