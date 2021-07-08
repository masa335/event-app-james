import { memo, useEffect, VFC } from "react";
import { Heading, Box, Image, Text } from "@chakra-ui/react"
import { useRecoilValue } from "recoil";
import { authState } from "../../recoil/atoms/Auth";
import { useUser } from "../../hooks/useUser";
import { useParams } from "react-router-dom";

export const User: VFC = memo(() => {
  // const auth = useRecoilValue(authState);
  // const user = auth.currentUser;
  const { id } = useParams<{ id: string }>();
  const { getUserInfo, loading, userInfo } = useUser();
  useEffect(() => getUserInfo(id),[]);
  

  return (
    <>
    <Box mx="40px" my="20px">
      <Box borderBottom="6px" borderStyle="double" borderColor="blackAlpha.400">
        <Image
            borderRadius="full"
            boxSize="160px"
            src="https://source.unsplash.com/random"
            alt={userInfo?.name}
            m="auto"
          />
        <Text fontSize="2xl" textAlign="center" color="gray.600">{userInfo?.name}</Text>
        <Text fontSize="lg" textAlign="center" color="gray.600">{userInfo?.self_introduction}</Text>
      </Box>
      <Box my="20px" p={1} bg="#76a1b8">
      <Heading as="h2" size="lg" color="white">イベント</Heading>
      </Box>
      <p>★TODO:主催、参加イベントをタブで分けたい。</p>
    </Box>
    
    
    </>
  );
});