import { Button } from "@chakra-ui/button";
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onClickUser: () => void;
  onClickLogin: () => void;
  onClickCreateEvent: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { isOpen, onClose, onClickUser, onClickLogin, onClickCreateEvent } = props;
  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            <Button w="100%" onClick={onClickCreateEvent}>
              イベント作成
            </Button>
            <Button w="100%" onClick={onClickUser}>
              アカウント
            </Button>
            <Button w="100%" onClick={onClickLogin}>
              ログイン
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});