import { Button } from "@chakra-ui/button";
import { Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/modal";
import { memo, VFC } from "react";

type Props = {
  isOpen: boolean;
  isSignedIn: boolean;
  onClose: () => void;
  onClickUser: () => void;
  onClickLogin: () => void;
  onClickLogout: () => void;
  onClickCreateEvent: () => void;
  onClickSettings: () => void;
};

export const MenuDrawer: VFC<Props> = memo((props) => {
  const { 
    isOpen, 
    isSignedIn, 
    onClose, 
    onClickUser, 
    onClickLogin, 
    onClickLogout, 
    onClickCreateEvent, 
    onClickSettings 
  } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody as="nav" p={0} bg="gray.100">
            { isSignedIn &&
              <Button w="100%" onClick={onClickCreateEvent}>
                イベント作成
              </Button>
            }
            { isSignedIn &&
              <Button w="100%" onClick={onClickUser}>
                アカウント
              </Button>
            }
            { isSignedIn &&
              <Button w="100%" onClick={onClickSettings}>
                設定
              </Button>
            }
            { isSignedIn ?
              <Button w="100%" onClick={onClickLogout}>
                ログアウト
              </Button>
            :
              <Button w="100%" onClick={onClickLogin}>
                ログイン
              </Button>
            }
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
});