import { memo, useEffect, VFC } from "react";
import { Stack, Modal, ModalContent, ModalOverlay, ModalHeader, ModalCloseButton, ModalBody, FormControl, FormLabel, Input, Textarea, Button, Text, Icon, Link } from "@chakra-ui/react";
import { Event } from "../../../types/event";
import { prefectures } from "../../../data/prefectures";
import { useMemberships } from "../../../hooks/useMemberships";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import { BiUser } from "react-icons/bi"
import { useUser } from "../../../hooks/useUser";


type Props = {
  userId: string | undefined;
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
};

export const FollowingModal: VFC<Props> = memo(props => {
  const { userId, isOpen, onClose, isSignedIn } = props;
  const { getFollowingOrFllowers, following } = useUser();
  const history = useHistory();
  
  useEffect(() => getFollowingOrFllowers(userId),[isOpen])


  return (
    <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom" autoFocus={false}>
      <ModalOverlay />
      <ModalContent pb={2}>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
        <ModalBody mx={6}>
          <Stack spacing={4}>
            {following.map((following) => (
              <Link>{following.name}</Link>
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
});