import { memo, useEffect, VFC } from "react";
import { Stack, Link, Tabs, TabPanels, TabPanel, TabList, Tab, Text, Image, HStack } from "@chakra-ui/react";
import { useHistory, useParams } from "react-router-dom";
import { useUser } from "../../hooks/useUser";


type Props = {
  defaultIndex: number | undefined;
};

export const FollowingAndFollower: VFC<Props> = memo(props => {
  const { defaultIndex } = props;
  const { id } = useParams<{ id: string }>(); //URLパラメーターを受け取る();
  const { getFollowingOrFllowers, following, followers } = useUser();
  const history = useHistory();
  
  useEffect(() => getFollowingOrFllowers(id, defaultIndex),[])

  const onChangeTab = (index: number) => {
    index === 0 ?
      history.push(`/following/${id}`)
    :
      history.push(`/followers/${id}`);
  };

  return (
    <>
    <Tabs onChange={onChangeTab} defaultIndex={defaultIndex}>
      <TabList>
        <Tab>フォロー中</Tab>
        <Tab>フォロワー</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <Stack maxW={500} spacing={4} m="auto">
            {following.map((following) => (
              <Link href={`/user/${following.id}`} key={following.id}>
              <HStack p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" bg="gray.100">
                <Image
                  borderRadius="full"
                  boxSize="50px"
                  src={following.image.url ?? `${process.env.PUBLIC_URL}/default_icon.png`}
                  alt={following.name}
                />
                <Stack>
                  <Text fontSize="sm">{following.name}</Text>
                  <Text >{following.self_introduction}</Text>
                </Stack>
              </HStack>
            </Link>
            ))}
          </Stack>
        </TabPanel>
        <TabPanel>
          <Stack maxW={500} spacing={4} m="auto">
            {followers.map((follower) => (
              <Link href={`/user/${follower.id}`} key={follower.id}>
                <HStack p={2} borderWidth="1px" borderRadius="lg" overflow="hidden" shadow="md" bg="gray.100">
                  <Image
                    borderRadius="full"
                    boxSize="50px"
                    src={follower.image.url ?? `${process.env.PUBLIC_URL}/default_icon.png`}
                    alt={follower.name}
                  />
                  <Stack>
                    <Text fontSize="sm">{follower.name}</Text>
                    <Text >{follower.self_introduction}</Text>
                  </Stack>
                </HStack>
              </Link>
            ))}
          </Stack>
        </TabPanel>
      </TabPanels>
    </Tabs>
    </>
  );
});